// Inside the ProjectDetails component

import React from "react";
import * as Yup from "yup";
import {
  FormControl,
  TextField,
  Select,
  MenuItem,
  Stack,
  CardActions,
  Autocomplete,
  Chip,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage, useField } from "formik";
import SubCard from "../../../../components/SubCard";
import CustomButton from "../../../../components/button";
import { availableSkills } from "../../Roles/ApplicationForm/skills";

// Validation schema for Project Details
const projectDetailsValidationSchema = Yup.object().shape({
  technicalRequirements: Yup.string().required(
    "Technical Requirements are required"
  ),
  designPreferences: Yup.string().required("Design Preferences are required"),
  selectedSkills: Yup.array().required("Competitor Analysis is required"),
  DevsNeeded: Yup.string().required("Enter the number of developers needed"),
  methodology: Yup.string().required("Methodology is required"),
});

const methodologyOptions = [
  { label: "Agile", value: "agile" },
  { label: "Waterfall", value: "waterfall" },
  { label: "Scrum", value: "scrum" },
  // Add more options as needed
];

const testingQAOptions = [
  { label: "Manual Testing", value: "manual_testing" },
  { label: "Automated Testing", value: "automated_testing" },
  { label: "Performance Testing", value: "performance_testing" },
];
const experienceLevel = [
  { label: "Senior", value: "senior" },
  { label: "Mid-Level", value: "midlevel" },
  { label: "Junior/Entry level", value: "entry" },
  { label: "Intern", value: "intern" },
];
const ProjectDetails = ({ onNext }) => {
  //  ks
  return (
    <Formik
      initialValues={{
        technicalRequirements: "",
        designPreferences: "",
        targetAudience: "",
        competitorAnalysis: "",
        dataContent: "",
        securityCompliance: "",
        DevsNeeded: "0",
        integrationsAPIs: "",
        experience: "midlevel",
        testingQA: "",
        milestones: [],
        selectedSkills: [],

        methodology: "",
      }}
      validationSchema={projectDetailsValidationSchema}
      onSubmit={(values) => onNext(values)}
    >
      {({ isSubmitting, values, setFieldValue }) => (
        <Form>
          <SubCard title="Step 2: Project Details">
            <Stack spacing={2}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Dev Methodology
                </InputLabel>
                <Field
                  name="methodology"
                  as={Select}
                  //   label=" DevMethodology"
                  variant="outlined"
                  fullWidth
                  defaultValue="Agile"
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
                  value={values.DevsNeeded}
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
                <InputLabel id="demo-simple-select-label">
                  Experience level
                </InputLabel>
                <Field
                  name="experience"
                  label="Experience Level"
                  as={Select}
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
                <InputLabel id="demo-simple-select-label">
                  Testing/QA
                </InputLabel>
                <Field
                  name="testingQA"
                  as={Select}
                  label="Testing/QA"
                  //   value={values.testingQA || "Agile"}
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
                      label="Skills Required"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
                <ErrorMessage name="testingQA" component="div">
                  {(msg) => (
                    <FormHelperText error variant="filled">
                      {msg}
                    </FormHelperText>
                  )}
                </ErrorMessage>
              </FormControl>
              <FormControl fullWidth>
                <Field
                  name="technicalRequirements"
                  type="text"
                  as={TextField}
                  label="Technical Requirements"
                  multiline
                  rows={4}
                  variant="outlined"
                  fullWidth
                />
                <ErrorMessage name="technicalRequirements" component="div">
                  {(msg) => (
                    <FormHelperText error variant="filled">
                      {msg}
                    </FormHelperText>
                  )}
                </ErrorMessage>
              </FormControl>

              <FormControl fullWidth>
                <Field
                  name="designPreferences"
                  type="text"
                  as={TextField}
                  label="Design Preferences"
                  multiline
                  rows={4}
                  variant="outlined"
                  fullWidth
                />
                <ErrorMessage name="designPreferences" component="div">
                  {(msg) => (
                    <FormHelperText error variant="filled">
                      {msg}
                    </FormHelperText>
                  )}
                </ErrorMessage>
              </FormControl>

              <FormControl fullWidth>
                <Field
                  name="securityCompliance"
                  type="text"
                  as={TextField}
                  label="Security Compliance"
                  multiline
                  rows={4}
                  variant="outlined"
                  fullWidth
                />
              </FormControl>

              <FormControl fullWidth>
                <Field
                  name="integrationsAPIs"
                  type="text"
                  as={TextField}
                  label="Integrations/APIs"
                  multiline
                  rows={4}
                  variant="outlined"
                  fullWidth
                />
              </FormControl>
              <FormControl fullWidth>
                <Field
                  name="dataContent"
                  type="text"
                  as={TextField}
                  label="Any additional Data to add"
                  multiline
                  rows={4}
                  variant="outlined"
                  fullWidth
                />
              </FormControl>
            </Stack>
            <CardActions sx={{ justifyContent: "space-between", pt: 2 }}>
              <CustomButton text="Back" variant="outlined" />
              <CustomButton text="Next" variant="contained" type="submit" />
            </CardActions>
          </SubCard>
        </Form>
      )}
    </Formik>
  );
};

export default ProjectDetails;
