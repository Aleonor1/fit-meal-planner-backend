import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsDate,
  IsOptional,
  IsNumber,
  IsEnum,
  ArrayNotEmpty,
  ArrayUnique,
  IsBoolean,
} from 'class-validator';
import { DietaryRestriction } from 'src/models/Client/DietaryRestriction';
import { Gender } from 'src/models/Client/Gender';
import { ClientStatus } from 'src/models/user/ClientStatus';

export class ClientRegistrationDto {
  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEnum(ClientStatus)
  status: ClientStatus;

  @IsNotEmpty()
  @IsDate()
  dateOfBirth: Date;

  @IsOptional()
  @IsString()
  phoneNumber: string;

  @IsNotEmpty()
  @IsBoolean()
  isAdmin: boolean;

  @IsOptional()
  @IsString()
  goal: string;

  @IsNotEmpty()
  @IsString()
  gender: string;

  @IsNotEmpty()
  @IsString()
  activityLevel: string;

  @IsOptional()
  @IsNumber()
  height: number;

  @IsOptional()
  @IsNumber()
  weight: number;

  @IsOptional()
  dietaryRestrictions: string[];

  @IsOptional()
  @IsNumber()
  calorieTarget: number;

  @IsOptional()
  macronutrientRatios: Record<string, number>;

  @IsOptional()
  mealSchedule: Record<string, string>;

  @IsOptional()
  @IsNumber()
  waterIntake: number;

  @IsOptional()
  allergies: string[];

  @IsOptional()
  favoriteRecipes: string[];
}
