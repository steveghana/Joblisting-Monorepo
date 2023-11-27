import { JobInfo } from '@/apps/roles/dto/create-role.dto';
import { IApplication } from './application';
import { IClient, IClientFormData } from './client';
// import { IDeveloper } from './developer';
import { Iinterviews } from './interviews';

export interface IRole {
  id?: string;
  client?: IClient;
  clientId?: string;
  devsNeeded: string;
  aboutTheProject: string;
  title: string;
  methodology: string;
  experience: string;
  communicationPreferences: string;
  jobs?: JobInfo[];
  vacancy_status: 'Open' | 'Closed'; // Open, Closed
  interviews?: any[];

  application?: IApplication[];
  createdAt?: Date;
  updateAt?: Date;
}
