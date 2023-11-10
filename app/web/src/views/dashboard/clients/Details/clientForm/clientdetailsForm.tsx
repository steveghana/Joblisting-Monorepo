import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { useFormData } from "./clientFormContext";
import CustomButton from "../../../../../components/button";

// Validation schema for Project Info
const projectInfoValidationSchema = Yup.object().shape({
  companyName: Yup.string().required("Company Name is required"),
  projectTitle: Yup.string().required("Project Title is required"),
  description: Yup.string().required("Description is required"),
  // email: Yup.string()
  //   .email("Must be a valid email")
  //   .max(255)
  //   .required("Email is required"),
  // name: Yup.string().max(255).min(2).required("Please enter a valid name"),
  // phoneNumber: Yup.string()
  //   .matches(/^[0-9]{8,15}$/, "Please enter a valid phone number")
  //   .required("Please enter your phone number"),
});

const formFields = [
  { name: "name", label: "Name" },
  { name: "email", label: "Email" },
  { name: "phoneNumber", label: "Phone Number" },
];

const ProjectInfo = ({ onNext }) => {
  const { formDataState, dispatch } = useFormData();
  return (
    <Formik
      initialValues={formDataState["Client info"]}
      validationSchema={projectInfoValidationSchema}
      onSubmit={(values) => {
        console.log({ CompanyInfo: { ...values } }, "from info");
        dispatch({ type: "updateclientInfo", payload: values });
        onNext(values);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Box>
            <Typography my={2} variant="h6">
              Step 1: Project Information
            </Typography>
            <Stack spacing={2}>
              {formFields.map((item) => (
                <Field
                  key={item.name}
                  name={item.name}
                  as={TextField}
                  label={item.label}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
              ))}
              <FormControl fullWidth>
                <Field
                  name="companyName"
                  as={TextField}
                  label="Company Name"
                  variant="outlined"
                  fullWidth
                />
                <ErrorMessage name="companyName" component="div">
                  {(msg) => (
                    <FormHelperText error variant="filled">
                      {msg}
                    </FormHelperText>
                  )}
                </ErrorMessage>
              </FormControl>

              <FormControl fullWidth>
                <Field
                  name="projectTitle"
                  as={TextField}
                  label="Project Title"
                  variant="outlined"
                  fullWidth
                />
                <ErrorMessage name="projectTitle" component="div">
                  {(msg) => (
                    <FormHelperText error variant="filled">
                      {msg}
                    </FormHelperText>
                  )}
                </ErrorMessage>
              </FormControl>

              <FormControl fullWidth>
                <Field
                  name="description"
                  as={TextField}
                  label="Description"
                  multiline
                  rows={4}
                  variant="outlined"
                  fullWidth
                />
                <ErrorMessage name="description" component="div">
                  {(msg) => (
                    <FormHelperText error variant="filled">
                      {msg}
                    </FormHelperText>
                  )}
                </ErrorMessage>
              </FormControl>

              <CustomButton
                text="Next"
                type="submit"
                variant="contained"
                disabled={isSubmitting}
              />
            </Stack>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default ProjectInfo;
