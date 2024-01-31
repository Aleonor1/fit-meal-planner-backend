import { Column, Entity } from 'typeorm';
import { User } from '../user/User';
import { ActivityLevel } from './ActivityLevel';
import { DietaryRestriction } from './DietaryRestriction';
import { Gender } from './Gender';

@Entity()
export class Client extends User {
  generateAccessToken(): string {
    throw new Error('Method not implemented.');
  }

  validatePassword(password: string): boolean {
    throw new Error('Method not implemented.');
  }

  @Column({ nullable: true })
  goal: string;

  @Column({ type: 'enum', enum: Gender, default: Gender.Other })
  gender: Gender;

  @Column({
    type: 'enum',
    enum: ActivityLevel,
    default: ActivityLevel.Sedentary,
  })
  activityLevel: ActivityLevel;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  height: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  weight: number;

  @Column('enum', {
    enum: DietaryRestriction,
    array: true,
    default: [],
    nullable: true,
  })
  dietaryRestrictions: DietaryRestriction[];

  @Column({ type: 'decimal', precision: 6, scale: 2, nullable: true })
  calorieTarget: number;

  @Column('simple-json', { nullable: true })
  macronutrientRatios: Record<string, number>;

  @Column('simple-json', { nullable: true })
  mealSchedule: Record<string, string>;

  @Column({ nullable: true })
  waterIntake: number;

  @Column('simple-array', { nullable: true })
  allergies: string[];

  @Column('simple-array', { nullable: true })
  favoriteRecipes: string[];
}
