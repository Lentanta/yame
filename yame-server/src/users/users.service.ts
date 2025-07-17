import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as crypto from 'crypto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) { }

  async signUp(username: string, password: string) {
    const user = await this.userRepo.findOneBy({ username });

    if (user) {
      throw new ConflictException('Username already exists');
    }

    const hashedPassword = crypto
      .createHash('md5')
      .update(password)
      .digest('hex');

    const newUser = new User();
    newUser.username = username;
    newUser.password = hashedPassword;

    return this.userRepo.save(newUser);
  }

  async signIn(username: string, password: string) {
    const hashedPassword = crypto
      .createHash('md5')
      .update(password)
      .digest('hex');

    const user = await this.userRepo.findOneBy({
      username,
      password: hashedPassword,
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    const payload = { id: user.id, username: user.username };
    const accessToken = await this.jwtService.signAsync(payload);

    return {
      id: user.id,
      username: user.username,
      accessToken,
    };
  }

  async findOne(id: number) {
    return await this.userRepo.findOneBy({ id });
  }
}
