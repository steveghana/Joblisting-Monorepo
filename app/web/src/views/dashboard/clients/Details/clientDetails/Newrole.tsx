// NewRoleForm.tsx
import React from "react";
import { Formik, Form, Field } from "formik";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
import ProjectDetails from "../clientForm/projectdetails";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useFormData } from "../../../../../utils/Contexts/clientFormContext";
import { useAddRoleMutation } from "../../../../../store/services/roleService";
import { ClientFormDataState } from "../../../../../types/client";
import { toast } from "react-toastify";

interface NewRoleFormProps {
  open: boolean;
  onClose: () => void;
}

const NewRoleForm: React.FC<NewRoleFormProps> = ({ open, onClose }) => {
  const initialValues = {
    title: "",
    devsNeeded: "",
    methodology: "",
    aboutTheProject: "",
    experience: "",
    communicationPreferences: "",
  };
  const { formDataState } = useFormData();
  const [createRole, { isError, isLoading }] = useAddRoleMutation();

  const handleSubmit = async () =>
    // values: ClientFormDataState["Project Details"]
    {
      // Implement logic to create a new role here
      console.log(formDataState);
      let values = formDataState["Project Details"];
      try {
        const response = await createRole({ ...values }).unwrap();
        if (!isLoading && response) {
          onClose();
        }
      } catch (error) {
        toast.error("Error submitting data", {
          position: "bottom-center",
        });
        return error;
      }
      // Reset the form after submission
      // resetForm();
    };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Role</DialogTitle>
      <PerfectScrollbar
        component="div"
        style={{
          //   height: "calc(100vh - 88px)",
          paddingLeft: "16px",
          paddingRight: "16px",
        }}
      >
        <DialogContent>
          <ProjectDetails
            atClientPage={true}
            handleExternalSubmit={(values) => handleSubmit()}
          />
        </DialogContent>
      </PerfectScrollbar>
    </Dialog>
  );
};

export default NewRoleForm;
