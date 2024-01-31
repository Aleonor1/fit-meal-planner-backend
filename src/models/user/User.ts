import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { ClientStatus } from './ClientStatus';

@Entity()
export abstract class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ length: 100, unique: true })
  userName: string;

  @Column({ length: 100 })
  firstName: string;

  @Column({ length: 100 })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  // @Column({ nullable: true })
  // profilePictureUrl: string;

  @Column({ type: 'enum', enum: ClientStatus, default: ClientStatus.Active })
  status: ClientStatus;

  @Column({ nullable: true })
  dateOfBirth: Date;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ default: false })
  isAdmin: boolean;

  abstract generateAccessToken(): string;
  abstract validatePassword(password: string): boolean;
}
