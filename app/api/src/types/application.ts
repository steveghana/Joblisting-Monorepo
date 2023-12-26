import { IDev } from './developer';
import { IRole } from './role';
export interface IApplication {
  id?: string;
  name: string;
  email: string;
  phoneNumber: string;
  selectedSkills: string[];
  resume?: Record<string, any>;
  years_of_experience: string;
  background_questions?: Record<string, string>; // Store background questions as JSON
  status: IStatusApplication; //
  address: string;
  roleApplyiingFor: string;
  role?: IRole;
  coverLetter: string;
}

export type IStatusApplication =
  | 'PendingShortlist'
  | 'Shortlisted'
  | 'Rejected'
  | 'Accepted';
