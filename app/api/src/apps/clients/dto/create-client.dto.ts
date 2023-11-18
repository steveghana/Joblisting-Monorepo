import { IClient, IClientFormData } from '@/types/client';
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsArray,
  IsDateString,
  IsEnum,
} from 'class-validator';

// Enum for employment type
enum EmploymentType {
  FullTime = 'Full Time',
  PartTime = 'Part Time',
  Contract = 'Contract',
}

// Enum for communication preferences
enum CommunicationPreferences {
  Email = 'Email',
  Phone = 'Phone',
  Both = 'Both',
}

export class ClientDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsArray()
  industry: string[];

  // Assuming numOfEmployees is a string
  @IsNotEmpty()
  @IsString()
  numOfEmployees: string;

  // Assuming companyName is a string
  @IsNotEmpty()
  @IsString()
  companyName: string;

  // Assuming description is a string
  @IsNotEmpty()
  @IsString()
  description: string;

  // Assuming phoneNumber is a string
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  // Assuming projectTitle is a string
  @IsNotEmpty()
  @IsString()
  projectTitle: string;

  // Assuming startDate is a date string
  @IsNotEmpty()
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
  DevsNeeded: string;

  // Assuming methodology is a string
  @IsNotEmpty()
  @IsString()
  methodology: string;

  // Assuming experience is a string
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
  @IsNotEmpty()
  @IsString()
  dataContent: string;

  constructor(data: IClientFormData['Additional Data']) {
    Object.assign(this, data);
  }
}

export class CommunicationTypeDto {
  // Assuming communicationPreferences is a string
  @IsNotEmpty()
  @IsEnum(CommunicationPreferences)
  communicationPreferences: string;

  // Assuming employmentType is a string
  @IsNotEmpty()
  @IsEnum(EmploymentType)
  employmentType: string;

  constructor(data: IClientFormData['Communication Type']) {
    Object.assign(this, data);
  }
}

export class ClientFormDataDto {
  @IsNotEmpty()
  clientInfo: ClientDto;

  @IsNotEmpty()
  projectDetails: ProjectDetailsDto;

  @IsNotEmpty()
  additionalData: AdditionalDataDto;

  @IsNotEmpty()
  communicationType: CommunicationTypeDto;

  constructor(data: IClientFormData) {
    this.clientInfo = new ClientDto(data['Client info']);
    this.projectDetails = new ProjectDetailsDto(data['Project Details']);
    this.additionalData = new AdditionalDataDto(data['Additional Data']);
    this.communicationType = new CommunicationTypeDto(
      data['Communication Type'],
    );
  }
}
