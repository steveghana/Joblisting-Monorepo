import React from "react";
import * as Yup from "yup";
import { FormControl, TextField, Stack, CardActions } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import SubCard from "../../../../components/SubCard";
import CustomButton from "../../../../components/button";

// Validation schema for Project Details
const projectDetailsValidationSchema = Yup.object().shape({
  technicalRequirements: Yup.string().required(
    "Technical Requirements are required"
  ),
  designPreferences: Yup.string().required("Design Preferences are required"),
  targetAudience: Yup.string().required("Target Audience is required"),
  competitorAnalysis: Yup.string().required("Competitor Analysis is required"),
  dataContent: Yup.string().required("Data Content is required"),
  securityCompliance: Yup.string().required("Security Compliance is required"),
  integrationsAPIs: Yup.string().required("Integrations/APIs are required"),
  testingQA: Yup.string().required("Testing/QA is required"),
  //   milestones: Yup.array().of(Yup.string().required("Milestone is required")),
  methodology: Yup.string().required("Methodology is required"),
});

const ProjectDetails = ({ onNext }) => {
  return (
    <Formik
      initialValues={{
        technicalRequirements: "",
        designPreferences: "",
        targetAudience: "",
        competitorAnalysis: "",
        dataContent: "",
        securityCompliance: "",
        integrationsAPIs: "",
        testingQA: "",
        // milestones: [],
        methodology: "",
      }}
      //   validationSchema={projectDetailsValidationSchema}
      onSubmit={(values) => onNext(values)}
    >
      {({ isSubmitting, values, handleChange }) => (
        <Form>
          <SubCard title="Step 2: Project Details">
            <Stack spacing={2}>
              {/* ... Other fields ... */}

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
                <ErrorMessage name="technicalRequirements" component="div" />
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
                <ErrorMessage name="designPreferences" component="div" />
              </FormControl>

              <FormControl fullWidth>
                <Field
                  name="targetAudience"
                  type="text"
                  as={TextField}
                  label="Target Audience"
                  multiline
                  rows={4}
                  variant="outlined"
                  fullWidth
                />
                <ErrorMessage name="targetAudience" component="div" />
              </FormControl>

              <FormControl fullWidth>
                <Field
                  name="competitorAnalysis"
                  type="text"
                  as={TextField}
                  label="Competitor Analysis"
                  multiline
                  rows={4}
                  variant="outlined"
                  fullWidth
                />
                <ErrorMessage name="competitorAnalysis" component="div" />
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
                <ErrorMessage name="securityCompliance" component="div" />
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
                <ErrorMessage name="integrationsAPIs" component="div" />
              </FormControl>

              <FormControl fullWidth>
                <Field
                  name="testingQA"
                  type="text"
                  as={TextField}
                  label="Testing/QA"
                  multiline
                  rows={4}
                  variant="outlined"
                  fullWidth
                />
                <ErrorMessage name="testingQA" component="div" />
              </FormControl>

              {/* Milestones - Dynamic List */}
              <FormControl fullWidth>
                {/* <FormLabel>Milestones</FormLabel> */}
                {values.milestones.map((milestone, index) => (
                  <div key={index}>
                    <TextField
                      name={`milestones[${index}]`}
                      value={milestone}
                      onChange={handleChange}
                      label={`Milestone ${index + 1}`}
                      variant="outlined"
                      fullWidth
                    />
                  </div>
                ))}
                <ErrorMessage name="milestones" component="div" />
              </FormControl>

              <FormControl fullWidth>
                <Field
                  name="methodology"
                  type="text"
                  as={TextField}
                  label="Methodology"
                  multiline
                  rows={4}
                  variant="outlined"
                  fullWidth
                />
                <ErrorMessage name="methodology" component="div" />
              </FormControl>
            </Stack>
          </SubCard>

          <CardActions sx={{ justifyContent: "space-between", pt: 2 }}>
            <CustomButton text="Back" variant="outlined" />
            <CustomButton text="Next" variant="contained" type="submit" />
          </CardActions>
        </Form>
      )}
    </Formik>
  );
};

export default ProjectDetails;
