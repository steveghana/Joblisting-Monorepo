import { IApplication } from '../../../types/application';
import { IClient } from '../../../types/client';
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsArray,
  IsDateString,
  IsEnum,
  isString,
  ValidateNested,
  IsOptional,
  IsNumber,
} from 'class-validator';
import { IRole } from '@/types/role';

export class CreateRoleDto {
  @IsNotEmpty()
  @IsNumber()
  clientId: number;
  @IsNotEmpty()
  @IsString()
  description: string;
  // developer: any;
  id?: number;
  @IsNotEmpty()
  @IsString()
  DevsNeeded: string;
  @IsOptional()
  @IsString()
  dataContent: string;
  @IsNotEmpty()
  @IsString()
  durationForEmployment: string;
  @IsNotEmpty()
  @IsString()
  experience: string;
  @IsNotEmpty()
  @IsString()
  methodology: string;
  @IsNotEmpty()
  @IsString()
  numOfEmployees: string;
  @IsOptional()
  @IsString()
  testingQA: string;
  @IsNotEmpty()
  @IsString()
  whenToStart: string;
  @IsNotEmpty()
  @IsArray()
  selectedSkills: string[];
  @IsNotEmpty()
  @IsString()
  title: string;
  // vacancy_status: 'Open' | 'Closed';
  constructor(data: IRole) {
    Object.assign(this, data);
  }
}
