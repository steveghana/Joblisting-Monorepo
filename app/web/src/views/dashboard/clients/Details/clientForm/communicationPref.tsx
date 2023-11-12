import React from "react";
import * as Yup from "yup";
import {
  FormControl,
  Checkbox,
  FormGroup,
  FormLabel,
  FormHelperText,
  Stack,
  CardActions,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import SubCard from "../../../../../components/SubCard";
import CustomButton from "../../../../../components/button";
import { useNavigate } from "react-router";
import { useFormData } from "./clientFormContext";

// const communicationPreferencesValidationSchema = Yup.object().shape({
//   communicationPreferences: Yup.array()
//     .min(1, "")
//     .max(1, ""),
// });

const CommunicationPreferences = ({ onNext }) => {
  const communicationOptions = [
    { label: "Email", value: "email" },
    { label: "Video Calls", value: "video_calls" },
    { label: "Project Management Tools", value: "project_tools" },
  ];
  const EmploymentType = [
    { label: "Full time (40 or more hrs/week)" },
    { label: "Part time (Less than 40 hrs/week)" },
    { label: "Hourly" },
    { label: "I'll decide later" },
  ];
  const { formDataState, dispatch } = useFormData();

  return (
    <Formik
      initialValues={formDataState["Communication Type"]}
      onSubmit={(values) => {
        dispatch({ type: "updatecommunicationPreference", payload: values });

        onNext(values);
      }}
    >
      {({ isSubmitting, values, handleChange }) => (
        <Form>
          <SubCard title="Step 4: Communication Preferences">
            {/* <Typography variant="h6">Step 3: Additional Data</Typography> */}

            <Stack spacing={2}>
              <FormControl>
                <FormLabel component="legend">
                  How Long Do you Need the Developer
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
              </FormControl>
              <FormControl
                required
                component="fieldset"
                sx={{ m: 3 }}
                variant="standard"
              >
                <FormLabel component="legend">Pick One</FormLabel>
                <FormGroup>
                  {communicationOptions.map((option) => (
                    <>
                      <RadioGroup
                        key={option.value}
                        aria-label="items"
                        name="communicationPreferences"
                        value={values.communicationPreferences}
                        onChange={handleChange}
                        row
                      >
                        <FormControlLabel
                          value={option.value}
                          control={<Radio />}
                          label={option.label}
                        />
                      </RadioGroup>
                    </>
                  ))}
                </FormGroup>
                {/* <>
                  {twoOrMore ? (
                    <FormHelperText error variant="filled">
                      Pick only one communication preference
                    </FormHelperText>
                  ) : error ? (
                    <FormHelperText error variant="filled">
                      Pick at least one communication preference
                    </FormHelperText>
                  ) : null}
                </> */}
              </FormControl>
              <CustomButton
                text="Next"
                disabled={isSubmitting}
                variant="contained"
                type="submit"
              />
            </Stack>
          </SubCard>
        </Form>
      )}
    </Formik>
  );
};

export default CommunicationPreferences;
