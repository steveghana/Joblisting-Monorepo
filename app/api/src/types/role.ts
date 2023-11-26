import { JobInfo } from '@/apps/clients/dto/create-client.dto';
import { IApplication } from './application';
import { IClient, IClientFormData } from './client';
// import { IDeveloper } from './developer';
import { Iinterviews } from './interviews';

export interface IRole {
  id?: string;
  client?: IClient;
  clientId?: string;
  selectedSkills: string[];
  devsNeeded: string;
  methodology: string;
  aboutTheProject: string;
  experience: string;
  roleName: string;
  communicationPreferences: string;
  aboutCompany?: string;
  title: string;
  jobs?: JobInfo[];
  vacancy_status: 'Open' | 'Closed'; // Open, Closed
  interviews?: any[];

  application?: IApplication[];
}
