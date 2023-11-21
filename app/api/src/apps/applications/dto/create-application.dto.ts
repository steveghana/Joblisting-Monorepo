import { IStatusApplication } from '@/types/application';
import { IDev } from '@/types/developer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsArray,
  Matches,
  MaxLength,
  MinLength,
  isNumber,
} from 'class-validator';

export class CreateApplicationDto {
  @IsNotEmpty({
    message: 'role is required',
  })
  @IsNumber()
  roleId: number;

  // developer: Partial<IDev>;
  @IsNotEmpty({
    message: 'name is required',
  })
  @IsString()
  name: string;
  @IsNotEmpty({
    message: 'phoneNumberis required',
  })
  @IsString()
  phoneNumber: string;
  @IsNotEmpty({
    message: 'address is required',
  })
  @IsString()
  address: string;
  @IsNotEmpty({
    message: 'skills is required',
  })
  @IsNotEmpty()
  @IsArray()
  skills: string[];
  @IsString()
  email: string;

  @IsString()
  years_of_experience: string;
  @IsOptional()
  coverLetter: string;

  @IsOptional()
  background_questions?: Record<string, string>;

  @IsNotEmpty({
    message: 'Resume is required',
  })
  resume: Record<string, any>;

  status: IStatusApplication;
}
