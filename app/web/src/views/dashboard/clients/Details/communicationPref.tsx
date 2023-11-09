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
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import SubCard from "../../../../components/SubCard";
import CustomButton from "../../../../components/button";

// Validation schema for Communication Preferences
const communicationPreferencesValidationSchema = Yup.object().shape({
  communicationPreferences: Yup.array()
    .min(1, "Pick at least one communication preference")
    .max(1, "Pick only one communication preference"),
});

const CommunicationPreferences = ({ onSubmit }) => {
  const communicationOptions = [
    { label: "Email", value: "email" },
    { label: "Video Calls", value: "video_calls" },
    { label: "Project Management Tools", value: "project_tools" },
    // Add more communication options as needed
  ];

  return (
    <Formik
      initialValues={{
        communicationPreferences: [],
      }}
      validationSchema={communicationPreferencesValidationSchema}
      onSubmit={(values) => onSubmit(values)}
    >
      {({ isSubmitting }) => (
        <Form>
          <SubCard title="Step 3: Communication Preferences">
            <Stack spacing={2}>
              <FormControl
                required
                component="fieldset"
                sx={{ m: 3 }}
                variant="standard"
              >
                <FormLabel component="legend">Pick One</FormLabel>
                <FormGroup>
                  {communicationOptions.map((option) => (
                    <FormControlLabel
                      key={option.value}
                      name="communicationPreferences"
                      control={
                        <Checkbox
                          name="communicationPreferences"
                          value={option.value}
                        />
                      }
                      label={option.label}
                    />
                  ))}
                </FormGroup>
                <ErrorMessage name="communicationPreferences" component="div" />
                <FormHelperText>
                  Pick one communication preference
                </FormHelperText>
              </FormControl>
            </Stack>
          </SubCard>

          <CardActions sx={{ justifyContent: "space-between", pt: 2 }}>
            <CustomButton text="Back" variant="outlined" />
            <CustomButton text="Submit" variant="contained" type="submit" />
          </CardActions>
        </Form>
      )}
    </Formik>
  );
};

export default CommunicationPreferences;
