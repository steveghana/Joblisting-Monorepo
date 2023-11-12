// AdditionalData.js

import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
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
} from "@mui/material";
import SubCard from "../../../../../components/SubCard";
import { useFormData } from "./clientFormContext";
import CustomButton from "../../../../../components/button";

const additionalDataValidationSchema = Yup.object().shape({
  dataContent: Yup.string().required("Additional Data is required"),
  durationForEmployment: Yup.string().required(
    "Employment duration is required"
  ),
  whenToStart: Yup.string().required("Select when the project starts"),
});
const Duration = [
  { label: "Less than a week" },
  { label: "1 to 4 weeks" },
  { label: "1 to 3 months" },
  { label: "3 to 6 months" },
  { label: "Longer than 6 months" },
  { label: "I will decide later" },
];
const whenToStart = [
  { label: "Immediately" },
  { label: "In 1 to 2 weeks" },
  { label: "More than 2 weeks from now" },
  { label: "I'll decide later" },
];
const AdditionalData = ({ onNext }) => {
  const { formDataState, dispatch } = useFormData();

  return (
    <Formik
      initialValues={formDataState["Additional Data"]}
      validationSchema={additionalDataValidationSchema}
      onSubmit={(values) => {
        dispatch({ type: "updateadditionalData", payload: values });
        onNext(values);
      }}
    >
      {({ isSubmitting, handleChange, values }) => (
        <Form>
          <Box>
            <Typography variant="h6">Step 3: Additional Data</Typography>
            <Stack mt={2} spacing={2}>
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
              </FormControl>
              <FormControl fullWidth>
                <Field
                  name="dataContent"
                  as={TextField}
                  label="Any additional Data to add"
                  multiline
                  rows={4}
                  variant="outlined"
                  fullWidth
                />
                <ErrorMessage name="dataContent" component="div">
                  {(msg) => (
                    <FormHelperText error variant="filled">
                      {msg}
                    </FormHelperText>
                  )}
                </ErrorMessage>
              </FormControl>

              <CustomButton
                type="submit"
                variant="contained"
                disabled={isSubmitting}
                text="Next"
              />
            </Stack>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default AdditionalData;
