import { IJobs } from ".";
import { userRole } from "../lib/roles";
import { IClient } from "./client";

// export type IRole = "Ceo" | "developer" | "hr";
export type IProfession =
  | "Ceo"
  | "Marketing"
  | "Recruitment"
  | "Developer"
  | "CTO";

export type UserRoleSelection = IProfession[]; // UserRole is defined as in the previous answer
export interface IRoleData {
  id?: number;

  client?: IClient;

  // developer: any;
  aboutTheProject: string;
  aboutCompany?: string;
  title: string;
  durationForEmployment: string;
  DevsNeeded: string;
  methodology: string;
  experience: string;
  testingQA: string;
  whenToStart: string;
  dataContent: string;
  // description: string;
  numOfEmployees: string;

  skills_required: string[]; // Store skills as JSON

  vacancy_status: "Open" | "Closed"; // Open, Closed

  interviews?: any[];

  application?: ApplicantsSubmission[];

  jobs: IJobs[];
}
export interface ApplicantsSubmission {
  name: string;
  email: string;
  phoneNumber: string;
  coverLetter: string;
  address: string;
  resume: Record<string, any>;
  selectedSkills: string[];
  years_of_experience: string;
}
