import { IDev } from './developer';

export interface Iinterviews {
  id: number;

  role: any;

  interviewer: IDev;

  interviewee: IDev;

  scheduled_date: Date;

  status: 'Scheduled' | 'Completed' | 'Canceled'; //
}
