import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export abstract class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  userName: string;

  @Column({ length: 100 })
  firstName: string;

  @Column({ length: 100 })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  profilePictureUrl: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  dateOfBirth: Date;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ default: false })
  isAdmin: boolean;

  abstract generateAccessToken(): string;
  abstract validatePassword(password: string): boolean;
}
