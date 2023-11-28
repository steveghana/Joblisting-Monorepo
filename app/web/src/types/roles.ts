import { IJobs } from ".";
import { userRole } from "../lib/data/roles";
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
  id?: string;

  client?: IClient;

  // developer: any;
  aboutTheProject: string;
  aboutCompany?: string;
  title: string;
  durationForEmployment: string;
  hiringRole: string;
  roleType: string;
  DevsNeeded: string;
  methodology: string;
  experience: string;
  employmentType: string;
  whenToStart: string;
  dataContent: string;
  createdAt: string;
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
  yearsOfExperience: string;
}
