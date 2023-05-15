import { Entity, Column, OneToMany } from 'typeorm';
import { User } from '../user/User';

@Entity()
export class Client extends User {
  generateAccessToken(): string {
    throw new Error('Method not implemented.');
  }
  validatePassword(password: string): boolean {
    throw new Error('Method not implemented.');
  }
  @Column()
  goal: string;

  @Column()
  activityLevel: string;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  height: number;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  weight: number;

  @Column()
  age: number;

  @Column()
  gender: string;

  @Column('simple-array')
  dietaryRestrictions: string[];

  @Column({ type: 'decimal', precision: 6, scale: 2 })
  calorieTarget: number;

  @Column('simple-json')
  macronutrientRatios: Record<string, number>;

  @Column('simple-json', { nullable: true })
  mealSchedule: Record<string, string>;

  @Column()
  waterIntake: number;

  @Column('simple-array', { nullable: true })
  allergies: string[];

  @Column('simple-array', { nullable: true })
  favoriteRecipes: string[];
}
