import { IApplication } from './application';
import { IClient, IClientFormData } from './client';
// import { IDeveloper } from './developer';
import { Iinterviews } from './interviews';

export interface IRole {
  id?: number;

  client?: IClient;
  clientId?: number;

  // developer: any;

  title: string;
  durationForEmployment: string;
  DevsNeeded: string;
  methodology: string;
  experience: string;
  testingQA: string;
  whenToStart: string;
  dataContent: string;
  description: string;
  numOfEmployees: string;

  skills_required: string[]; // Store skills as JSON

  vacancy_status: 'Open' | 'Closed'; // Open, Closed

  interviews?: any[];

  application?: IApplication[];
}
