import { CountryType } from "../content/applications/Users/settings/CountrySelector";
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
  startDate: Date;
  companyLogo: string;
  aboutTheCompany: string;
  country: Record<string, any>;
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
    DevsNeeded: string;
    methodology: string;
    aboutTheProject: string;
    experience: string;
    hiringRole: string;
  };
  ["Additional Data"]: {
    durationForEmployment: string;
    whenToStart: string;
    dataContent: string;
  };
  ["Communication Type"]: {
    communicationPreferences: string;
    employmentType: string;
  };
}
export type ClientFormDataAction =
  | {
      type: "updateProjectInfo";
      payload: ClientFormDataState["Project Details"];
    }
  | { type: "updateclientInfo"; payload: ClientFormDataState["Client info"] }
  | {
      type: "updateadditionalData";
      payload: ClientFormDataState["Additional Data"];
    }
  | {
      type: "updatecommunicationPreference";
      payload: ClientFormDataState["Communication Type"];
    }
  | { type: "reset"; payload: ClientFormDataState };
export interface ClientFormDataContextProps {
  formDataState: ClientFormDataState;
  dispatch: (action: ClientFormDataAction) => void;
}
