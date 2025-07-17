import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  title: string;

  @Column()
  status: string;

  @Column()
  content: string;

  @ManyToOne(() => User, (user) => user.notes)
  user: User;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
