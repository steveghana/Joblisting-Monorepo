export interface IClient {
  id?: number;
  avatar?: string;
  name: string;
  email: string;
  industry: string[];
  // country:Record<string, any>
  numOfEmployees: string;
  companyName: string;
  description: string;
  phoneNumber: string;
  projectTitle: string;
  startDate: Date;
}
export interface IClientFormData {
  ['Client info']: IClient;
  ['Project Details']: {
    selectedSkills: string[];
    DevsNeeded: string;
    methodology: string;
    experience: string;
    testingQA: string;
  };
  ['Additional Data']: {
    durationForEmployment: string;

    whenToStart: string;
    dataContent: string;
  };
  ['Communication Type']: {
    communicationPreferences: string;
    employmentType: string;
  };
}
