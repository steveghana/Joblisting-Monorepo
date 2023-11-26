import { IDev } from './developer';
import { IRole } from './role';
export interface ApplicantsSubmission {}
export interface IApplication {
  id?: number;
  name: string;
  email: string;
  phoneNumber: string;
  resume?: Record<string, any>;
  years_of_experience: string;
  background_questions?: Record<string, string>; // Store background questions as JSON
  status: IStatusApplication; //
  address: string;
  coverLetter: string;
}

export type IStatusApplication =
  | 'PendingShortlist'
  | 'Shortlisted'
  | 'Rejected'
  | 'Accepted';
