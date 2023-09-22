import { IApplication } from './application';
import { IClient } from './client';
import { IDeveloper } from './developer';
import { Iinterviews } from './interviews';

export type IRole = {
  id: number;

  client: IClient;

  developer: IDeveloper;

  title: string;

  description: string;

  skills_required: string[]; // Store skills as JSON

  vacancy_status: string; // Open, Closed

  interviews: Iinterviews[];

  application: IApplication[];
};
