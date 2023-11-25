import { CountryType } from "../content/applications/Users/settings/CountrySelector";
export interface IClient {
  id?: number;
  name: string;
  avatar?: string;
  companyLogo: string;
  companyName: string;
  email: string;
  country: CountryType;
  phoneNumber: string;
  projectTitle: string;
  startDate: string;
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
    testingQA: string;
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
