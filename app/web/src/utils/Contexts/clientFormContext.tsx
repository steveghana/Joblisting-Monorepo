import { createContext, useContext, useReducer, ReactNode } from "react";
import {
  ClientFormDataAction,
  ClientFormDataContextProps,
  ClientFormDataState,
} from "../../types/client";

const FormDataContext = createContext<ClientFormDataContextProps | null>(null);

const initialState: ClientFormDataState = {
  ["Client info"]: {
    name: "",
    email: "",
    phoneNumber: "",
    companyName: "",
    country: { code: "IL", label: "Israel", phone: "972" },
    numOfEmployees: "",
    projectTitle: "",
    aboutTheCompany: "",
    companyLogo: "",
  },
  ["Project Details"]: {
    selectedSkills: [],
    DevsNeeded: "",
    methodology: "agile",
    aboutTheProject: "",
    experience: "",
    testingQA: "",
  },
  ["Additional Data"]: {
    durationForEmployment: "",
    dataContent: "",
    whenToStart: "",
  },
  ["Communication Type"]: {
    communicationPreferences: "",
    employmentType: "",
  },
};

const formDataReducer = (
  state: ClientFormDataState,
  action: ClientFormDataAction
): ClientFormDataState => {
  switch (action.type) {
    case "updateProjectInfo":
      return { ...state, ["Project Details"]: action.payload };
    case "updateclientInfo":
      return { ...state, ["Client info"]: action.payload };
    case "updateadditionalData":
      return { ...state, ["Additional Data"]: action.payload };
    case "updatecommunicationPreference":
      return { ...state, ["Communication Type"]: action.payload };

    case "reset":
      return action.payload;
    default:
      return state;
  }
};

interface FormDataProviderProps {
  children: ReactNode;
}

const FormDataProvider = ({ children }: FormDataProviderProps) => {
  const [formDataState, dispatch] = useReducer(formDataReducer, initialState);

  return (
    <FormDataContext.Provider value={{ formDataState, dispatch }}>
      {children}
    </FormDataContext.Provider>
  );
};

const useFormData = (): ClientFormDataContextProps => {
  const context = useContext(FormDataContext);
  if (!context) {
    throw new Error("useFormData must be used within a FormDataProvider");
  }
  return context;
};

export { FormDataProvider, useFormData };
