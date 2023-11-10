// ProjectDetails.js

import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage, useField } from "formik";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Autocomplete,
  Chip,
  FormHelperText,
} from "@mui/material";
import SubCard from "../../../../../components/SubCard";
import CustomButton from "../../../../../components/button";
import { availableSkills } from "../../../Roles/ApplicationForm/skills";
import {
  experienceLevel,
  projectRequirementFields,
  testingQAOptions,
  methodologyOptions,
} from "./data";

// Validation schema for Project Details
const projectDetailsValidationSchema = Yup.object().shape({
  // technicalRequirements: Yup.string().required(
  //   "Technical Requirements are required"
  // ),
  // designPreferences: Yup.string().required("Design Preferences are required"),
  selectedSkills: Yup.array().required("Skills are required"),
  DevsNeeded: Yup.string().required("Enter the number of developers needed"),
  methodology: Yup.string().required("Methodology is required"),
});

const ProjectDetails = ({ onNext }) => {
  return (
    <Formik
      initialValues={{
        // technicalRequirements: "",
        // designPreferences: "",
        selectedSkills: [],
        DevsNeeded: "",
        methodology: "Agile",
        experience: "",
        testingQA: "",
      }}
      validationSchema={projectDetailsValidationSchema}
      onSubmit={(values) => onNext({ ["Project Details"]: { ...values } })}
    >
      {({ isSubmitting, values, setFieldValue }) => (
        <Form>
          <Box>
            <Typography my={2} variant="h6">
              Step 2: Project Details
            </Typography>
            <Stack spacing={2}>
              <FormControl fullWidth>
                <InputLabel id="methodology-label">Dev Methodology</InputLabel>
                <Field
                  name="methodology"
                  as={Select}
                  label="Dev Methodology"
                  variant="outlined"
                  fullWidth
                >
                  {methodologyOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Field>
                <ErrorMessage name="methodology" component="div">
                  {(msg) => (
                    <FormHelperText error variant="filled">
                      {msg}
                    </FormHelperText>
                  )}
                </ErrorMessage>
              </FormControl>

              <FormControl fullWidth>
                <Field
                  name="DevsNeeded"
                  as={TextField}
                  label="Developers Needed"
                  variant="outlined"
                  fullWidth
                />
                <ErrorMessage name="DevsNeeded" component="div">
                  {(msg) => (
                    <FormHelperText error variant="filled">
                      {msg}
                    </FormHelperText>
                  )}
                </ErrorMessage>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel id="experience-label">Experience Level</InputLabel>
                <Field
                  name="experience"
                  as={Select}
                  label="Experience Level"
                  variant="outlined"
                  fullWidth
                >
                  {experienceLevel.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Field>
                <ErrorMessage name="experience" component="div">
                  {(msg) => (
                    <FormHelperText error variant="filled">
                      {msg}
                    </FormHelperText>
                  )}
                </ErrorMessage>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel id="testingQA-label">Testing/QA</InputLabel>
                <Field
                  name="testingQA"
                  as={Select}
                  label="Testing/QA"
                  variant="outlined"
                  fullWidth
                >
                  {testingQAOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Field>
              </FormControl>

              <FormControl fullWidth>
                <Autocomplete
                  multiple
                  id="skills-autocomplete"
                  options={availableSkills}
                  value={values.selectedSkills}
                  onChange={(_, newValue) => {
                    setFieldValue("selectedSkills", newValue.slice(0, 10)); // Limit to 10 skills
                  }}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip label={option} {...getTagProps({ index })} />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      name="selectedSkills"
                      label="Skills Required"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
                <ErrorMessage name="selectedSkills" component="div">
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

export default ProjectDetails;
