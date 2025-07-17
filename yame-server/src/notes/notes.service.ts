import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Note } from './entities/note.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private noteRepo: Repository<Note>,
  ) { }

  async create(
    createNoteDto: { title: string; status: string; content: string },
    user: User,
  ) {
    const newNote = new Note();
    newNote.title = createNoteDto.title;
    newNote.content = createNoteDto.content;
    newNote.status = createNoteDto.status;

    newNote.userId = user.id;
    newNote.user = user;

    const createdNote = await this.noteRepo.save(newNote);
    return {
      id: createdNote.id,
      userId: createdNote.userId,
      title: createdNote.title,
      content: createdNote.content,
      status: createdNote.status,
    };
  }

  async findAll(userId: number) {
    return await this.noteRepo.findAndCount({
      where: { userId },
      select: { id: true, title: true, status: true },
    });
  }

  async findOne(id: number, userId: number) {
    const notes = await this.noteRepo.find({
      where: { id, userId },
      select: { id: true, title: true, status: true },
    });

    return notes[0];
  }

  async update(
    id: number,
    userId: number,
    updateNoteDto: { title: string; status: string; content: string },
  ) {
    const notes = await this.noteRepo.find({
      where: { id, userId },
      select: { id: true, title: true, status: true },
    });

    const note = notes[0];
    note.title = updateNoteDto.title;
    note.content = updateNoteDto.content;
    note.status = updateNoteDto.status;

    const updatedNote = await this.noteRepo.save(note);
    return {
      id: updatedNote.id,
      userId: updatedNote.userId,
      title: updatedNote.title,
      content: updatedNote.content,
      status: updatedNote.status,
    };
  }

  // remove(id: number) {
  //   return `This action removes a #${id} note`;
  // }
}
