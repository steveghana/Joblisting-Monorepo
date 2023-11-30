import { ClockHours } from '@/apps/clocked-hours/entities/clocked-hour.entity';
import { IApplication } from './application';
import { Ihours } from './hours';
import { Iinterviews } from './interviews';
import { IRole } from './role';
import { IUser } from './user';
import { Interview } from '@/apps/interviews/entities/interview.entity';
import { IClient } from './client';

export interface IDev {
  id?: string;

  user: IUser;

  firstName: string;
  lastName: string;

  skills: string[];
  phone_number: string;
  salary: number;
  address: string;

  role_status: 'InHouse' | 'Pending' | 'Accepted' | 'External';
  // application: IApplication;
  // In House, Pending Interview, External
  years_of_experience: string;
  client: IClient;
  roles: IRole;
  // Define the associations with Interviews, ClockHours, and Applications
  interviewsAsInterviewer?: Partial<Interview>[];

  interviewsAsInterviewee?: Partial<Interview>[];

  clockHours?: Partial<ClockHours>[];
}
