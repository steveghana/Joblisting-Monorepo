import { IDev } from './developer';

export interface IApplication {
  id?: number;
  resume: string; // Store as file path or link

  years_of_experience: number;
  developer?: IDev;
  background_questions: Record<string, string>; // Store background questions as JSON

  cover_letter?: string;

  status: IStatusApplication; //
}

export type IStatusApplication = {
  status: 'Submitted' | 'Shortlisted' | 'Rejected';
};
