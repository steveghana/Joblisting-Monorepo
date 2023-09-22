import { IApplication } from './application';
import { Ihours } from './hours';
import { IRole } from './role';
import { IUser } from './user';

export interface IDeveloper {
  id: number;

  user: any;

  name: string;

  email: string;

  phone_number: string;

  address: string;

  role_status: 'InHouse' | 'Pending' | 'Interview' | 'External';
  // application: IApplication;
  // In House, Pending Interview, External

  // roles: IRole;
  // Define the associations with Interviews, ClockHours, and Applications
  // interviewsAsInterviewer: IDeveloper;

  // interviewsAsInterviewee: IDeveloper[];

  // clockHours: Ihours[];
}
