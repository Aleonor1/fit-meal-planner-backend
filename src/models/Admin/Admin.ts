import { Entity, Column } from 'typeorm';
import { User } from '../user/User';

@Entity()
export class Admin extends User {
  generateAccessToken(): string {
    throw new Error('Method not implemented.');
  }

  validatePassword(password: string): boolean {
    throw new Error('Method not implemented.');
  }

  @Column({ default: true })
  isAdmin: boolean;

  constructor() {
    super();
    this.isAdmin = true;
  }
}
