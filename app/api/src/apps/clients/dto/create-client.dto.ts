import { IClient, IClientFormData } from '@/types/client';
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
import { Type } from 'class-transformer';
// Enum for employment type

// Enum for communication preferences

export class ClientDto {
  @IsOptional()
  @IsNumber()
  id?: number;
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsOptional()
  @IsArray()
  industry: string[];
  @IsNotEmpty()
  @IsString()
  numOfEmployees: string;
  @IsNotEmpty()
  @IsString()
  companyName: string;
  @IsOptional()
  @IsString()
  companyLogo: string;
  @IsNotEmpty()
  @IsString()
  aboutTheCompany: string;
  // Assuming description is a string
  @IsNotEmpty()
  // @IsString()
  country: Record<string, any>;
  // Assuming phoneNumber is a string
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;
  // Assuming projectTitle is a string
  @IsNotEmpty()
  @IsString()
  projectTitle: string;

  // Assuming startDate is a date string
  @IsOptional()
  @IsDateString()
  startDate: Date;

  constructor(data: IClient) {
    Object.assign(this, data);
  }
}

export class ProjectDetailsDto {
  @IsNotEmpty()
  @IsArray()
  selectedSkills: string[];

  // Assuming DevsNeeded is a string
  @IsNotEmpty()
  @IsString()
  devsNeeded: string;
  @IsNotEmpty()
  @IsString()
  aboutTheProject: string;
  @IsOptional()
  @IsString()
  hiringRole: string;
  @IsNotEmpty()
  @IsString()
  employmentType: string;
  // Assuming methodology is a string
  @IsNotEmpty()
  @IsString()
  methodology: string;
  @IsNotEmpty()
  @IsString()
  experience: string;

  // Assuming testingQA is a string
  @IsNotEmpty()
  @IsString()
  testingQA: string;

  constructor(data: IClientFormData['Project Details']) {
    Object.assign(this, data);
  }
}

export class AdditionalDataDto {
  // Assuming durationForEmployment is a string
  @IsNotEmpty()
  @IsString()
  durationForEmployment: string;

  // Assuming whenToStart is a string
  @IsNotEmpty()
  @IsString()
  whenToStart: string;

  // Assuming dataContent is a string
  @IsOptional()
  @IsString()
  dataContent: string;

  constructor(data: IClientFormData['Additional Data']) {
    Object.assign(this, data);
  }
}

export class CommunicationTypeDto {
  // Assuming communicationPreferences is a string
  @IsNotEmpty()
  @IsString()
  communicationPreferences: string;

  // Assuming employmentType is a string
  @IsNotEmpty()
  @IsString()
  employmentType: string;

  constructor(data: IClientFormData['Communication Type']) {
    Object.assign(this, data);
  }
}

export class ClientFormDataDto {
  @Type(() => ClientDto)
  @ValidateNested()
  @IsNotEmpty()
  'Client Info': ClientDto;

  @Type(() => ProjectDetailsDto)
  @ValidateNested()
  @IsNotEmpty()
  'Project Details': ProjectDetailsDto;

  @Type(() => AdditionalDataDto)
  @ValidateNested()
  @IsNotEmpty()
  'Additional Data': AdditionalDataDto;

  @Type(() => CommunicationTypeDto)
  @ValidateNested()
  @IsNotEmpty()
  'Communication Type': CommunicationTypeDto;
}
