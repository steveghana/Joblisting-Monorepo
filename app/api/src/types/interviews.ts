import { IDeveloper } from './developer';

export interface Iinterviews {
  id: number;

  role: any;

  interviewer: IDeveloper;

  interviewee: IDeveloper;

  scheduled_date: Date;

  status: 'Scheduled' | 'Completed' | 'Canceled'; //
}
