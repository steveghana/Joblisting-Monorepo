import { IDev } from './developer';
import { IRole } from './role';

export interface Iinterviews {
  id?: string;

  role: IRole;

  guest?: IDev[];
  eventType: string;
  eventOption: string;
  description: string;
  eventLInk: string;
  starttime: string;
  endtime: string;
  startDate: Date;
  endDate: Date;
  candidate?: IDev;

  createdAt?: Date;
  updatedAt?: Date;

  status: 'Scheduled' | 'Completed' | 'Canceled'; //
}
