import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotesModule } from './notes/notes.module';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from './utils/constants';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'tam',
      password: 'tam123',
      database: 'tamdb',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // use only in development
      logging: true,
    }),
    JwtModule.register({
      global: true,
      secret: JWT_SECRET,
    }),
    UsersModule,
    NotesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
