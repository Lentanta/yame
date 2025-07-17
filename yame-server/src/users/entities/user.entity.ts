import { Note } from 'src/notes/entities/note.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Note, (note) => note.user)
  notes: Note[];

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
