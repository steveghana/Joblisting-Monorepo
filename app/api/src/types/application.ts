import { IDev } from './developer';
import { IRole } from './role';
export interface ApplicantsSubmission {}
export interface IApplication {
  id?: number;
  // Store as file path or linkr
  // role?:IRole;
  name: string;
  email: string;
  phoneNumber: string;
  resume?: Record<string, any>;
  // selectedSkills: [string];
  years_of_experience: string;
  // developer?: IDev;
  background_questions?: Record<string, string>; // Store background questions as JSON
  // selectedSkills: [string];
  status: IStatusApplication; //
  address: string;
  coverLetter: string;
}

export type IStatusApplication =
  | 'PendingShortlist'
  | 'Shortlisted'
  | 'Rejected'
  | 'Accepted';
