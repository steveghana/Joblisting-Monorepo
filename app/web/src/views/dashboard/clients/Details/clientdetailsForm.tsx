import React from "react";
import * as Yup from "yup";
import {
  Box,
  Typography,
  Stack,
  TextField,
  FormControl,
  CardActions,
  FormHelperText,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import SubCard from "../../../../components/SubCard";
import CustomButton from "../../../../components/button";
import CountrySelector from "../../../../content/applications/Users/settings/CountrySelector";

// Validation schema for Client Info
const clientInfoValidationSchema = Yup.object().shape({
  name: Yup.string().required("Full Name is required"),
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  phoneNumber: Yup.string().required("Phone Number is required"),
  projectName: Yup.string().required("Project Name is required"),
  budget: Yup.number().required("Budget is required"),
  startDate: Yup.date().required("Start Date is required"),
  projectDuration: Yup.number().required(
    "Project Duration (in days) is required and should be a number"
  ),
});

const ClientInfo = ({ onNext }) => {
  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        phoneNumber: "",
        projectName: "",
        budget: "",
        startDate: "",
        projectDuration: "",
      }}
      validationSchema={clientInfoValidationSchema}
      onSubmit={(values) => onNext(values)}
    >
      {({ isSubmitting }) => (
        <Form>
          <SubCard title="Step 1: Client Info">
            <Stack spacing={2}>
              <FormControl fullWidth>
                <Field
                  name="name"
                  type="text"
                  as={TextField}
                  label="Full Name"
                  variant="outlined"
                  fullWidth
                />
                <ErrorMessage name="name" component="div">
                  {(msg) => (
                    <FormHelperText error variant="filled">
                      {msg}
                    </FormHelperText>
                  )}
                </ErrorMessage>
              </FormControl>

              <FormControl fullWidth>
                <Field
                  name="email"
                  type="text"
                  as={TextField}
                  label="Email"
                  variant="outlined"
                  fullWidth
                />
                <ErrorMessage name="email" component="div">
                  {(msg) => (
                    <FormHelperText error variant="filled">
                      {msg}
                    </FormHelperText>
                  )}
                </ErrorMessage>
              </FormControl>

              <FormControl fullWidth>
                <Field
                  name="phoneNumber"
                  type="text"
                  as={TextField}
                  label="Phone Number"
                  variant="outlined"
                  fullWidth
                />
                <ErrorMessage name="phoneNumber" component="div">
                  {(msg) => (
                    <FormHelperText error variant="filled">
                      {msg}
                    </FormHelperText>
                  )}
                </ErrorMessage>
              </FormControl>

              <FormControl fullWidth>
                <Field
                  name="projectName"
                  type="text"
                  as={TextField}
                  label="Project Name or Title"
                  variant="outlined"
                  fullWidth
                />{" "}
                <ErrorMessage name="projectName" component="div">
                  {(msg) => (
                    <FormHelperText error variant="filled">
                      {msg}
                    </FormHelperText>
                  )}
                </ErrorMessage>
              </FormControl>

              <FormControl fullWidth>
                <Field
                  name="budget"
                  type="text"
                  as={TextField}
                  label="Budget"
                  variant="outlined"
                  fullWidth
                />
                <ErrorMessage name="budget" component="div">
                  {(msg) => (
                    <FormHelperText error variant="filled">
                      {msg}
                    </FormHelperText>
                  )}
                </ErrorMessage>
              </FormControl>

              <FormControl fullWidth>
                <Field
                  name="startDate"
                  type="date"
                  as={TextField}
                  label="Start Date"
                  variant="outlined"
                  placeholder=""
                  fullWidth
                />
                <ErrorMessage name="startDate" component="div">
                  {(msg) => (
                    <FormHelperText error variant="filled">
                      {msg}
                    </FormHelperText>
                  )}
                </ErrorMessage>
              </FormControl>

              <FormControl fullWidth>
                <Field
                  name="projectDuration"
                  type="text"
                  as={TextField}
                  label="Project Duration (in days)"
                  variant="outlined"
                  fullWidth
                />
                <ErrorMessage name="projectDuration" component="div">
                  {(msg) => (
                    <FormHelperText error variant="filled">
                      {msg}
                    </FormHelperText>
                  )}
                </ErrorMessage>
              </FormControl>
            </Stack>
            <CardActions sx={{ justifyContent: "flex-end", pt: 2 }}>
              <CustomButton text="Next" variant="contained" type="submit" />
            </CardActions>
          </SubCard>
        </Form>
      )}
    </Formik>
  );
};

export default ClientInfo;
