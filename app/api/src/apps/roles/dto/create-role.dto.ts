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
import { Type } from 'class-transformer';

export class ProjectDetailsDto {
  // Assuming DevsNeeded is a string
  @IsNotEmpty()
  @IsString()
  devsNeeded: string;
  @IsNotEmpty()
  @IsString()
  aboutTheProject: string;
  @IsOptional()
  @IsString()
  title: string;
  @IsOptional()
  @IsString()
  numOfEmployees: string;

  // Assuming methodology is a string
  @IsNotEmpty()
  @IsString()
  methodology: string;
  @IsNotEmpty()
  @IsString()
  experience: string;

  @IsOptional()
  @IsString()
  roleName: string;
  // Assuming testingQA is a string
  @IsNotEmpty()
  @IsString()
  communicationPreferences: string;

  constructor(data: ProjectDetailsDto) {
    Object.assign(this, data);
  }
}

export class RoleInfoDto {
  // Assuming durationForEmployment is a string
  @IsNotEmpty()
  @IsString()
  durationForEmployment: string;
  @IsNotEmpty()
  @IsString()
  roleName: string;
  @IsNotEmpty()
  @IsArray()
  selectedSkills: string[];
  // Assuming whenToStart is a string
  @IsNotEmpty()
  @IsString()
  whenToStart: string;
  @IsOptional()
  @IsString()
  salary: string;
  @IsNotEmpty()
  @IsString()
  employmentType: string;

  @IsOptional()
  @IsString()
  roleCategory: string;
  @IsOptional()
  @IsString()
  postedDate: Date;
  @IsNotEmpty()
  @IsString()
  tasks: string[];
  @IsOptional()
  @IsString()
  description: string[];
  constructor(data: JobInfo) {
    Object.assign(this, data);
  }
}

export interface JobInfo {
  description: string[];
  id: string;
  role: IRole;
  roleType: string;
  whenToStart: string;
  employmentType: string;
  jobtype: string;
  salary: string;
  roleCategory: string;
  postedDate: Date;
  roleName: string;
  tasks: string[]; // Array of tasks
}

export class CreateRoleDto {
  @IsNotEmpty()
  @IsString()
  clientId: number;

  id?: string;
  @Type(() => ProjectDetailsDto)
  @ValidateNested()
  @IsNotEmpty()
  'Project Details': ProjectDetailsDto;

  @Type(() => RoleInfoDto)
  @ValidateNested()
  @IsNotEmpty()
  'Role Info': RoleInfoDto;
  // vacancy_status: 'Open' | 'Closed';
}
