import { IApplication } from './application';
import { IClient, IClientFormData } from './client';
// import { IDeveloper } from './developer';
import { Iinterviews } from './interviews';

export interface IRole {
  id?: number;

  client?: IClient;
  clientId?: number;

  // developer: any;
  aboutTheProject: string;
  aboutCompany?: string;
  title: string;
  durationForEmployment: string;
  employmentType: string;
  devsNeeded: string;
  methodology: string;
  experience: string;
  hiringRole: string;
  whenToStart: string;
  dataContent: string;
  // description: string;
  numOfEmployees: string;

  skills_required: string[]; // Store skills as JSON

  vacancy_status: 'Open' | 'Closed'; // Open, Closed

  interviews?: any[];

  application?: IApplication[];
}
