import { IStatusApplication } from '@/types/application';
import { IDev } from '@/types/developer';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  isNumber,
} from 'class-validator';

export class CreateApplicationDto {
  @IsNotEmpty({
    message: 'role is required',
  })
  roleId: number;

  developer: Partial<IDev>;

  background_questions: Record<string, string>; // Store background questions as JSON

  years_of_experience: number;
  @IsOptional()
  cover_letter: string;

  @IsString({
    message: 'resume is required is required',
  })
  resume: string;
  @IsString({
    message: 'resume is required is required',
  })
  status: IStatusApplication;
}
