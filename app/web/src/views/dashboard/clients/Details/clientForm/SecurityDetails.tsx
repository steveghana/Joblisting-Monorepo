// SecurityIntegration.js

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

// Validation schema for Security and Integration
const securityIntegrationValidationSchema = Yup.object().shape({
  securityCompliance: Yup.string().required("Security Compliance is required"),
  integrationsAPIs: Yup.string().required("Integrations/APIs are required"),
});

const SecurityIntegration = ({ onNext }) => {
  return (
    <Formik
      initialValues={{ securityCompliance: "", integrationsAPIs: "" }}
      validationSchema={securityIntegrationValidationSchema}
      onSubmit={(values) => onNext(values)}
    >
      {({ isSubmitting }) => (
        <Form>
          <Box>
            <Typography variant="h6">
              Step 3: Security and Integration
            </Typography>
            <Stack spacing={2}>
              <FormControl fullWidth>
                <Field
                  name="securityCompliance"
                  as={TextField}
                  label="Security Compliance"
                  multiline
                  rows={4}
                  variant="outlined"
                  fullWidth
                />
                <ErrorMessage name="securityCompliance" component="div">
                  {(msg) => (
                    <FormHelperText error variant="filled">
                      {msg}
                    </FormHelperText>
                  )}
                </ErrorMessage>
              </FormControl>

              <FormControl fullWidth>
                <Field
                  name="integrationsAPIs"
                  as={TextField}
                  label="Integrations/APIs"
                  multiline
                  rows={4}
                  variant="outlined"
                  fullWidth
                />
                <ErrorMessage name="integrationsAPIs" component="div">
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

export default SecurityIntegration;
