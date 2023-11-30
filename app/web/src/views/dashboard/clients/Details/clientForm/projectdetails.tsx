import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage, useField } from "formik";
import {
  Box,
  Typography,
  TextField,
  Stack,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
  FormGroup,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
} from "@mui/material";
import CustomButton from "../../../../../components/button";
import {
  experienceLevel,
  methodologyOptions,
} from "../../../../../lib/data/data";
import { useFormData } from "../../../../../utils/Contexts/clientFormContext";
import { ArrowBack, BackHand } from "@mui/icons-material";
import { communicationOptions } from "../../../../../lib/data/formFieldData";

// Validation schema for Project Details
const projectDetailsValidationSchema = Yup.object().shape({
  aboutTheProject: Yup.string().required(
    "Give us some information about the project"
  ),
  // designPreferences: Yup.string().required("Design Preferences are required"),
  experience: Yup.string().required("Experience level is required"),
  devsNeeded: Yup.string().required("Enter the number of developers needed"),
  methodology: Yup.string().required("Methodology is required"),
  communicationPreferences: Yup.string().required(
    "Select a communication preference"
  ),
});

const ProjectDetails = ({ onNext, handleBack }) => {
  const { formDataState, dispatch } = useFormData();

  return (
    <Formik
      initialValues={formDataState["Project Details"]}
      validationSchema={projectDetailsValidationSchema}
      onSubmit={(values) => {
        dispatch({ type: "updateProjectInfo", payload: values });

        onNext(values);
      }}
    >
      {({ isSubmitting, values, setFieldValue, handleChange }) => (
        <Form>
          <Box>
            <Typography my={2} variant="h6">
              Step 2: Project Details
            </Typography>
            <Stack spacing={2}>
              <FormControl fullWidth>
                <InputLabel id="methodology-label">Dev Methodology</InputLabel>
                <Field
                  name="methodology"
                  as={Select}
                  label="Dev Methodology"
                  variant="outlined"
                  fullWidth
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
                  name="devsNeeded"
                  as={TextField}
                  label="Developers Needed"
                  variant="outlined"
                  fullWidth
                />
                <ErrorMessage name="devsNeeded" component="div">
                  {(msg) => (
                    <FormHelperText error variant="filled">
                      {msg}
                    </FormHelperText>
                  )}
                </ErrorMessage>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel id="experience-label">Experience Level</InputLabel>
                <Field
                  name="experience"
                  as={Select}
                  label="Experience Level"
                  variant="outlined"
                  fullWidth
                >
                  {experienceLevel.map((option) => (
                    <MenuItem key={option.value} value={option.label}>
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

              <FormGroup>
                <FormLabel component="legend">Pick One</FormLabel>

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
                <ErrorMessage name="communicationPreferences" component="div">
                  {(msg) => (
                    <FormHelperText error variant="filled">
                      {msg}
                    </FormHelperText>
                  )}
                </ErrorMessage>
              </FormGroup>
              <FormControl fullWidth>
                <Field
                  name="aboutTheProject"
                  as={TextField}
                  label="About The Project"
                  multiline
                  rows={4}
                  variant="outlined"
                  fullWidth
                />
                <ErrorMessage name="aboutTheProject" component="div">
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

export default ProjectDetails;
