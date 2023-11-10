import { createContext, useContext, useReducer, ReactNode } from "react";

interface FormDataState {
  ["Client info"]: {
    name: string;
    email: string;
    phoneNumber: string;
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
    dataContent: string;
  };
  ["Communication Type"]: {
    communicationPreferences: string;
  };
  // Add other steps' data as needed
}

type FormDataAction =
  | { type: "updateProjectInfo"; payload: FormDataState["Project Details"] }
  | { type: "updateclientInfo"; payload: FormDataState["Client info"] }
  | { type: "updateadditionalData"; payload: FormDataState["Additional Data"] }
  | {
      type: "updatecommunicationPreference";
      payload: FormDataState["Communication Type"];
    }
  // Add other action types as needed
  | { type: "reset"; payload: FormDataState };

interface FormDataContextProps {
  formDataState: FormDataState;
  dispatch: (action: FormDataAction) => void;
}

const FormDataContext = createContext<FormDataContextProps | null>(null);

const initialState: FormDataState = {
  ["Client info"]: {
    name: "",
    email: "",
    phoneNumber: "",
    companyName: "",
    projectTitle: "",
    description: "",
  },
  ["Project Details"]: {
    selectedSkills: [],
    DevsNeeded: "",
    methodology: "Agile",
    experience: "",
    testingQA: "",
  },
  ["Additional Data"]: {
    dataContent: "",
  },
  ["Communication Type"]: {
    communicationPreferences: "",
  },
  // Add other steps' data as needed
};

const formDataReducer = (
  state: FormDataState,
  action: FormDataAction
): FormDataState => {
  switch (action.type) {
    case "updateProjectInfo":
      return { ...state, ["Project Details"]: action.payload };
    case "updateclientInfo":
      return { ...state, ["Client info"]: action.payload };
    case "updateadditionalData":
      return { ...state, ["Additional Data"]: action.payload };
    case "updatecommunicationPreference":
      return { ...state, ["Communication Type"]: action.payload };
    // Add cases for other steps as needed
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

const useFormData = (): FormDataContextProps => {
  const context = useContext(FormDataContext);
  if (!context) {
    throw new Error("useFormData must be used within a FormDataProvider");
  }
  return context;
};

export { FormDataProvider, useFormData };
