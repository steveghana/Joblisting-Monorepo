import { IApplication } from './application';
import { IClient } from './client';
import { IDeveloper } from './developer';
import { Iinterviews } from './interviews';

export type IRole = {
  id: number;

  client: IClient;

  developer: any;

  title: string;

  description: string;

  skills_required: string[]; // Store skills as JSON

  vacancy_status: 'Open' | 'Closed'; // Open, Closed

  interviews?: any[];

  applications: IApplication[];
};
