// NewJobForm.tsx
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
import PerfectScrollbar from "react-perfect-scrollbar";
import RoleInfo from "../clientForm/addtionallInfo";

interface NewJobFormProps {
  open: boolean;
  onClose: () => void;
}

const NewJobForm: React.FC<NewJobFormProps> = ({ open, onClose }) => {
  const initialValues = {
    description: "",
    roleType: "Remote",
    whenToStart: "",
    employmentType: "",
    country: "",
    selectedSkills: [],
    roleName: "",
    jobType: "",
    salary: "",
    tasks: [],
    roleCategory: "",
  };

  const handleSubmit = (values: any, { resetForm }: any) => {
    // Implement logic to create a new job here
    console.log(values);

    // Reset the form after submission
    resetForm();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Job</DialogTitle>
      <PerfectScrollbar
        component="div"
        style={{
          height: "calc(100vh - 88px)",
          paddingLeft: "16px",
          paddingRight: "16px",
        }}
      >
        <DialogContent>
          <RoleInfo
            atClientPage={true}
            handleExternalSubmit={(values) => console.log(values)}
          />
        </DialogContent>
      </PerfectScrollbar>
    </Dialog>
  );
};

export default NewJobForm;
