import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpCode,
  Get,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('/sign-up')
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() signUpDto: { username: string; password: string }) {
    const { username, password } = signUpDto;

    await this.usersService.signUp(username, password);
    return { message: 'Sign up successfully', data: {} };
  }

  @Post('/sign-in')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() signInDto: { username: string; password: string }) {
    const { username, password } = signInDto;

    const data = await this.usersService.signIn(username, password);
    return { message: 'sign in successfully', data };
  }

  @Get('/profile')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async getProfile(@Request() req) {
    const user = await this.usersService.findOne(req.user.id);
    return {
      message: 'get profile successfully',
      data: {
        id: user.id,
        uesrname: user.username
      }
    };
  }
}
