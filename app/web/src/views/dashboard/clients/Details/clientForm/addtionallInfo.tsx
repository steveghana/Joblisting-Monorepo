// AdditionalData.js

import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import {
  Box,
  Typography,
  TextField,
  Stack,
  FormControl,
  FormHelperText,
  CardActions,
  Button,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormGroup,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
  Chip,
} from "@mui/material";
import SubCard from "../../../../../components/SubCard";
import { useFormData } from "../../../../../utils/Contexts/clientFormContext";
import CustomButton from "../../../../../components/button";
import { ArrowBack, BackHand } from "@mui/icons-material";
import { techRoles } from "../../../../../lib/data/jobs";
import { availableSkills } from "../../../Roles/ApplicationForm/skills";

const additionalDataValidationSchema = Yup.object().shape({
  // dataContent: Yup.string().required("Additional Data is required"),
  durationForEmployment: Yup.string().required(
    "Employment duration is required"
  ),
  selectedSkills: Yup.array().required("Skills are required"),

  title: Yup.string().required("Add the role title"),
  whenToStart: Yup.string().required("Select when the project starts"),
  roleName: Yup.string().required("Please select the role you are hiring for!"),

  employmentType: Yup.string().required("Employment type is required"),
  tasks: Yup.array()
    .of(Yup.string().required("Add and fill at least one task"))
    .min(1, "Add and fill at least one task"),
});
const Duration = [
  { label: "Less than a week" },
  { label: "1 to 4 weeks" },
  { label: "1 to 3 months" },
  { label: "3 to 6 months" },
  { label: "Longer than 6 months" },
  { label: "I'll decide later" },
];
const whenToStart = [
  { label: "Immediately" },
  { label: "In 1 to 2 weeks" },
  { label: "More than 2 weeks from now" },
  { label: "I'll decide later" },
];

const EmploymentType = [
  { label: "Full time (40 or more hrs/week)" },
  { label: "Part time (Less than 40 hrs/week)" },
  { label: "Hourly" },
  { label: "Contract" },
  { label: "I'll decide later" },
];
const AdditionalData = ({ onNext, handleBack }) => {
  const { formDataState, dispatch } = useFormData();

  return (
    <Formik
      initialValues={formDataState["Role Info"]}
      validationSchema={additionalDataValidationSchema}
      onSubmit={(values) => {
        dispatch({ type: "updateRoleInfo", payload: values });
        onNext(values);
      }}
    >
      {({ isSubmitting, handleChange, values, setFieldValue }) => (
        <Form>
          <Box>
            <Typography variant="h6">Step 3: Role Info</Typography>
            <Stack mt={2} spacing={2}>
              {/* ... (Previous form fields) */}

              {/* Tasks Section */}

              <Typography variant="subtitle1">Tasks</Typography>
              <FormControl fullWidth>
                <FieldArray
                  name="tasks"
                  render={(arrayHelpers) => (
                    <div>
                      {values.tasks.map((task, taskIndex) => (
                        <div key={taskIndex}>
                          <Field
                            name={`tasks.${taskIndex}`}
                            as={TextField}
                            label={`Task ${taskIndex + 1}`}
                            variant="outlined"
                            fullWidth
                          />
                          <Box
                            display={"flex"}
                            // justifyContent={"space-between"}
                            gap={1}
                          >
                            <CustomButton
                              size="small"
                              type="button"
                              variant="contained"
                              onClick={() => arrayHelpers.push("")}
                              text="Add Task"
                            />
                            {/* {values.tasks.length > 1 && ( */}
                            <CustomButton
                              size="small"
                              type="button"
                              variant="outlined"
                              onClick={() => arrayHelpers.remove(taskIndex)}
                              text="Remove Task"
                            />
                            {/* )} */}
                          </Box>
                        </div>
                      ))}
                      {values.tasks.length < 1 && (
                        <CustomButton
                          size="small"
                          type="button"
                          variant="contained"
                          onClick={() => arrayHelpers.push("")}
                          text="Add a new task"
                        />
                      )}
                    </div>
                  )}
                />
                <ErrorMessage name="tasks" component="div">
                  {(msg) => (
                    <FormHelperText error variant="filled">
                      {msg}
                    </FormHelperText>
                  )}
                </ErrorMessage>
              </FormControl>
              {/* <TextField plac/> */}
              <FormControl fullWidth>
                <Field
                  name="title"
                  as={TextField}
                  label="Enter the role title"
                  placeholder={"eg. Senior Fullstack Engineer"}
                  variant="outlined"
                  fullWidth
                />
                <ErrorMessage name="title" component="div">
                  {(msg) => (
                    <FormHelperText error variant="filled">
                      {msg}
                    </FormHelperText>
                  )}
                </ErrorMessage>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="role-label">
                  Select role Are You Hiring For
                </InputLabel>
                <Field name="roleName" as={Select} variant="outlined" fullWidth>
                  {Object.keys(techRoles).map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Field>
                <ErrorMessage name="roleName" component="div">
                  {(msg) => (
                    <FormHelperText error variant="filled">
                      {msg}
                    </FormHelperText>
                  )}
                </ErrorMessage>
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
              <FormControl>
                <FormLabel component="legend">
                  How Long Do you Need the Developer
                </FormLabel>
                {Duration.map((duration) => (
                  <RadioGroup
                    aria-label="items"
                    name="durationForEmployment"
                    value={values.durationForEmployment}
                    onChange={handleChange}
                    row
                  >
                    <FormControlLabel
                      value={duration.label}
                      control={<Radio />}
                      label={duration.label}
                    />
                  </RadioGroup>
                ))}
                <ErrorMessage name="durationForEmployment" component="div">
                  {(msg) => (
                    <FormHelperText error variant="filled">
                      {msg}
                    </FormHelperText>
                  )}
                </ErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel component="legend">
                  When do you need the developer to start?
                </FormLabel>
                {whenToStart.map((startDay) => (
                  <RadioGroup
                    aria-label="items"
                    name="whenToStart"
                    value={values.whenToStart}
                    onChange={handleChange}
                    row
                  >
                    <FormControlLabel
                      value={startDay.label}
                      control={<Radio />}
                      label={startDay.label}
                    />
                  </RadioGroup>
                ))}
                <ErrorMessage name="whenToStart" component="div">
                  {(msg) => (
                    <FormHelperText error variant="filled">
                      {msg}
                    </FormHelperText>
                  )}
                </ErrorMessage>
              </FormControl>

              <FormControl>
                <FormLabel component="legend">
                  Whats the employment type
                </FormLabel>
                {EmploymentType.map((duration) => (
                  <RadioGroup
                    aria-label="items"
                    name="employmentType"
                    value={values.employmentType}
                    onChange={handleChange}
                    row
                  >
                    <FormControlLabel
                      value={duration.label}
                      control={<Radio />}
                      label={duration.label}
                    />
                  </RadioGroup>
                ))}
                <ErrorMessage name="employmentType" component="div">
                  {(msg) => (
                    <FormHelperText error variant="filled">
                      {msg}
                    </FormHelperText>
                  )}
                </ErrorMessage>
              </FormControl>
              <FormControl fullWidth>
                <Field
                  name="salary"
                  as={TextField}
                  label="Expect salary"
                  variant="outlined"
                  fullWidth
                />
                <ErrorMessage name="salary" component="div">
                  {(msg) => (
                    <FormHelperText error variant="filled">
                      {msg}
                    </FormHelperText>
                  )}
                </ErrorMessage>
              </FormControl>
              <Box display={"flex"} gap={1}>
                <CustomButton
                  text="Back"
                  fullWidth
                  startIcon={<ArrowBack />}
                  disabled={isSubmitting}
                  type="button"
                  variant="outlined"
                  onClick={handleBack}
                />
                <CustomButton
                  text="Next"
                  fullWidth
                  disabled={isSubmitting}
                  variant="contained"
                  type="submit"
                />
              </Box>
            </Stack>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default AdditionalData;
