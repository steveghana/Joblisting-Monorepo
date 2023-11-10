// ProjectInfo.js

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

// Validation schema for Project Info
const projectInfoValidationSchema = Yup.object().shape({
  companyName: Yup.string().required("Company Name is required"),
  projectTitle: Yup.string().required("Project Title is required"),
  description: Yup.string().required("Description is required"),
});

const ProjectInfo = ({ onNext }) => {
  return (
    <Formik
      initialValues={{ companyName: "", projectTitle: "", description: "" }}
      validationSchema={projectInfoValidationSchema}
      onSubmit={(values) => {
        console.log({ CompanyInfo: { ...values } }, "from info");
        onNext({ ["Company Name"]: { ...values } });
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Box>
            <Typography my={2} variant="h6">
              Step 1: Project Information
            </Typography>
            <Stack spacing={2}>
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

              <Button type="submit" variant="contained" disabled={isSubmitting}>
                Next
              </Button>
            </Stack>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default ProjectInfo;
