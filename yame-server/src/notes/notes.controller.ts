import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { UsersService } from 'src/users/users.service';

@Controller('notes')
export class NotesController {
  constructor(
    private readonly notesService: NotesService,
    private readonly userService: UsersService,
  ) { }

  @Post()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Request() req,
    @Body()
    createNoteDto: {
      title: string;
      status: string;
      content: string;
    },
  ) {
    const user = await this.userService.findOne(req?.user?.id);
    return await this.notesService.create(createNoteDto, user);
  }

  @Get()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async findAll(@Request() req) {
    const userId = req?.user?.id;
    return await this.notesService.findAll(userId);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Request() req, @Param('id') id: string) {
    const userId = req?.user?.id;
    return await this.notesService.findOne(+id, userId);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Request() req,
    @Param('id') id: string,
    @Body()
    updateNoteDto: {
      title: string;
      status: string;
      content: string;
    },
  ) {
    const userId = req?.user?.id;
    return await this.notesService.update(+id, userId, updateNoteDto);
  }

  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.notesService.remove(+id);
  // }
}
