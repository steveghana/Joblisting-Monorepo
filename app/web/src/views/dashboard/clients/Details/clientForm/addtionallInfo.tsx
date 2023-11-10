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
} from "@mui/material";
import SubCard from "../../../../../components/SubCard";

// Validation schema for Additional Data
const additionalDataValidationSchema = Yup.object().shape({
  dataContent: Yup.string().required("Additional Data is required"),
});

const AdditionalData = ({ onNext }) => {
  return (
    <Formik
      initialValues={{ dataContent: "" }}
      validationSchema={additionalDataValidationSchema}
      onSubmit={(values) => onNext({ "Any Additional Data": { ...values } })}
    >
      {({ isSubmitting }) => (
        <Form>
          <Box>
            <Typography variant="h6">Step 3: Additional Data</Typography>
            <Stack spacing={2}>
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

              <CardActions sx={{ justifyContent: "space-between", pt: 2 }}>
                <Button type="button" variant="outlined">
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                >
                  Next
                </Button>
              </CardActions>
            </Stack>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default AdditionalData;
