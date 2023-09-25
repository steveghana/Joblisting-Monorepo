import { IDev } from './developer';

export interface Iinterviews {
  id?: number;

  roleId: number;

  interviewer: IDev;

  interviewee: IDev;

  scheduled_date: Date;

  status: 'Scheduled' | 'Completed' | 'Canceled'; //
}
