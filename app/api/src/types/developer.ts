import { ClockHours } from '@/apps/clocked-hours/entities/clocked-hour.entity';
import { IApplication } from './application';
import { Ihours } from './hours';
import { Iinterviews } from './interviews';
import { IRole } from './role';
import { IUser } from './user';
import { Interview } from '@/apps/interviews/entities/interview.entity';

export interface IDev {
  id: number;

  user: IUser;

  name: string;

  phone_number: string;

  address: string;

  role_status: 'InHouse' | 'Pending' | 'Interview' | 'External';
  // application: IApplication;
  // In House, Pending Interview, External

  roles: IRole;
  // Define the associations with Interviews, ClockHours, and Applications
  interviewsAsInterviewer?: Partial<Interview>[];

  interviewsAsInterviewee?: Partial<Interview>[];

  clockHours?: Partial<ClockHours>[];
}
