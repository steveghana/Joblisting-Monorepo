export interface IClient {
  firstName: string;
  avatar?: string;
  companyName: string;
  email: string;
  lastName: string;
  phoneNumber: string;
  projectTitle: string;
  startDate: string;
}
export interface ClientFormDataState {
  ["Client info"]: {
    name: string;
    email: string;
    phoneNumber: string;
    numOfEmployees: string;

    companyName: string;
    projectTitle: string;
    description: string;
  };
  ["Project Details"]: {
    selectedSkills: string[];
    DevsNeeded: string;
    methodology: string;
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
