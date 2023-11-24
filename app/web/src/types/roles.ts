import { IJobs } from ".";
import { userRole } from "../lib/roles";

// export type IRole = "Ceo" | "developer" | "hr";
export type IProfession =
  | "Ceo"
  | "Marketing"
  | "Recruitment"
  | "Developer"
  | "CTO";

export type UserRoleSelection = IProfession[]; // UserRole is defined as in the previous answer
export interface IRoleData {
  clientID?: string;
  name: string;
  subName: string;
  description: string;
  jobs: IJobs[];
  founders: {
    name: string;
    role: string;
  };
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
