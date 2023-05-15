import { Entity, Column } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Admin extends User {
  @Column({ default: true })
  isAdmin: boolean;
}
