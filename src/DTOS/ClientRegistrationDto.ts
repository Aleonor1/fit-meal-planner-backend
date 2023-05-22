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
}
