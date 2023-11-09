// Milestones.js

import React from "react";
import * as Yup from "yup";
import { Formik, Form, FieldArray, Field, ErrorMessage } from "formik";
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

// Validation schema for Milestones
const milestonesValidationSchema = Yup.object().shape({
  milestones: Yup.array().of(Yup.string()).required("Milestones are required"),
});

const Milestones = ({ onNext }) => {
  return (
    <Formik
      initialValues={{ milestones: [""] }}
      validationSchema={milestonesValidationSchema}
      onSubmit={(values) => onNext(values)}
    >
      {({ isSubmitting, values }) => (
        <Form>
          <Box>
            <Typography variant="h6">Step 5: Milestones</Typography>
            <FieldArray name="milestones">
              {({ insert, remove, push }) => (
                <Stack spacing={2}>
                  {values.milestones.map((milestone, index) => (
                    <SubCard key={index} title={`Milestone ${index + 1}`}>
                      <FormControl fullWidth>
                        <Field
                          name={`milestones[${index}]`}
                          as={TextField}
                          label="Milestone"
                          variant="outlined"
                          fullWidth
                        />
                        <ErrorMessage
                          name={`milestones[${index}]`}
                          component="div"
                        >
                          {(msg) => (
                            <FormHelperText error variant="filled">
                              {msg}
                            </FormHelperText>
                          )}
                        </ErrorMessage>
                      </FormControl>

                      {index > 0 && (
                        <Button
                          type="button"
                          variant="outlined"
                          onClick={() => remove(index)}
                        >
                          Remove
                        </Button>
                      )}
                    </SubCard>
                  ))}

                  <CardActions sx={{ justifyContent: "space-between", pt: 2 }}>
                    <Button
                      type="button"
                      variant="outlined"
                      onClick={() => push("")}
                    >
                      Add Milestone
                    </Button>
                    <Button
                      type="button"
                      variant="outlined"
                      onClick={() => remove(values.milestones.length - 1)}
                    >
                      Remove Last Milestone
                    </Button>
                  </CardActions>
                </Stack>
              )}
            </FieldArray>
          </Box>

          <CardActions sx={{ justifyContent: "space-between", pt: 2 }}>
            <Button type="button" variant="outlined">
              Back
            </Button>
            <Button type="submit" variant="contained" disabled={isSubmitting}>
              Next
            </Button>
          </CardActions>
        </Form>
      )}
    </Formik>
  );
};

export default Milestones;
