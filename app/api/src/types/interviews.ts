import { IDev } from './developer';
import { IRole } from './role';

export interface Iinterviews {
  id?: string;

  role: IRole;

  interviewer: IDev;

  interviewee: IDev;

  scheduled_date: Date;
  createdAt?: Date;
  updatedAt?: Date;

  status: 'Scheduled' | 'Completed' | 'Canceled'; //
}
