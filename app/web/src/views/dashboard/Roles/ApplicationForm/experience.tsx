import React from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import { TextField, Button, Typography } from "@mui/material";

const WorkExperienceForm = ({ onSubmit, onBack }) => {
  return (
    <Formik initialValues={{ workExperience: [] }} onSubmit={onSubmit}>
      {({ values }) => (
        <Form>
          <FieldArray
            name="workExperience"
            render={(arrayHelpers) => (
              <div>
                {values.workExperience.map((exp, index) => (
                  <div key={index}>
                    <Field
                      name={`workExperience[${index}].jobTitle`}
                      as={TextField}
                      label="Job Title"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                    />
                    <Field
                      name={`workExperience[${index}].company`}
                      as={TextField}
                      label="Company"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                    />
                    <Field
                      name={`workExperience[${index}].startDate`}
                      as={TextField}
                      label="Start Date"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                    />
                    <Field
                      name={`workExperience[${index}].endDate`}
                      as={TextField}
                      label="End Date"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                    />
                    <Button
                      onClick={() => arrayHelpers.remove(index)}
                      variant="outlined"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  onClick={() =>
                    arrayHelpers.push({
                      jobTitle: "",
                      company: "",
                      startDate: "",
                      endDate: "",
                    })
                  }
                  variant="outlined"
                >
                  Add Experience
                </Button>
              </div>
            )}
          />
          <Button onClick={onBack} variant="outlined">
            Back
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Next
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default WorkExperienceForm;
