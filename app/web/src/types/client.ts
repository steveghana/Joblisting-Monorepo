import { CountryType } from "../content/applications/Users/settings/CountrySelector";
import { IRoleData } from "./roles";
export interface IClient {
  id?: number;
  avatar?: string;
  name: string;
  email: string;
  industry: string[];
  numOfEmployees: string;
  companyName: string;
  phoneNumber: string;
  projectTitle: string;
  roles?: IRoleData[];
  startDate: Date;
  companyLogo: string;
  aboutTheCompany: string;
  country: Record<string, any>;
}
export interface JobInfo {
  roleId: string;
  description: string[];
  jobLocation: string;
  employmentType: string;
  salary: string;
  location: string;
  roleCategory: string;
  postedDate: Date;
  roleName: string;
  tasks: string[]; // Array of tasks
}
export interface ClientFormDataState {
  ["Client info"]: {
    name: string;
    email: string;
    companyLogo: string;
    phoneNumber: string;
    numOfEmployees: string;
    country: CountryType;
    companyName: string;
    projectTitle: string;
    aboutTheCompany: string;
  };
  ["Project Details"]: {
    selectedSkills: string[];
    devsNeeded: string;
    methodology: string;
    aboutTheProject: string;
    experience: string;
    roleName: string;
    communicationPreferences: string;
  };
  ["Role Info"]: {
    durationForEmployment: string;
    whenToStart: string;
    salary: string;
    location: string;
    roleCategory: string;
    tasks: string[]; // Array of tasks
    employmentType: string; // Employment types related to the role
    // roleName: string;
  };
}
interface LocationInfo {
  continent: string;
  country: string;
}
export type ClientFormDataAction =
  | {
      type: "updateProjectInfo";
      payload: ClientFormDataState["Project Details"];
    }
  | { type: "updateclientInfo"; payload: ClientFormDataState["Client info"] }
  | {
      type: "updateRoleInfo";
      payload: ClientFormDataState["Role Info"];
    }
  | { type: "reset"; payload: ClientFormDataState };
export interface ClientFormDataContextProps {
  formDataState: ClientFormDataState;
  dispatch: (action: ClientFormDataAction) => void;
}
