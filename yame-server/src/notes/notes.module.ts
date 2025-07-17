import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Note]), UsersModule],
  controllers: [NotesController],
  providers: [NotesService],
})
export class NotesModule { }
