import React, { useState } from "react";
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
  Checkbox,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import { useFormData } from "../../../../../utils/Contexts/clientFormContext";
import CustomButton from "../../../../../components/button";

import ContrySelector from "../../../../../content/applications/Users/settings/CountrySelector";

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
const employed = [
  { label: "Less than 10", value: "low" },
  { label: "11 - 50", value: "mid" },
  { label: "51 - 200", value: "high" },
];

const ProjectInfo = ({ onNext }) => {
  const { formDataState, dispatch } = useFormData();
  console.log(formDataState["Client info"]);
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
      {({ isSubmitting, values, handleChange }) => (
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
              <Box my={1}>
                <ContrySelector onChange={handleChange} name={"country"} />
              </Box>
              {/* <Country */}
              <FormControl>
                <FormLabel component="legend">
                  How many people are employed at the company?
                </FormLabel>
                {employed.map((employed) => (
                  <RadioGroup
                    aria-label="items"
                    name="numOfEmployees"
                    value={values.numOfEmployees}
                    onChange={handleChange}
                    row
                  >
                    <FormControlLabel
                      value={employed.value}
                      control={<Radio />}
                      label={employed.label}
                    />
                  </RadioGroup>
                ))}
              </FormControl>
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
