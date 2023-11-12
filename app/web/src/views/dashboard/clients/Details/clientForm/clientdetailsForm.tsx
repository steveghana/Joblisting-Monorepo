import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  FormControl,
  FormHelperText,
  Checkbox,
  FormControlLabel,
  FormLabel,
} from "@mui/material";
import { useFormData } from "./clientFormContext";
import CustomButton from "../../../../../components/button";
import {
  Circle,
  CircleOutlined,
  ThumbDownOffAlt,
  ThumbUp,
} from "@mui/icons-material";

// Validation schema for Project Info
const projectInfoValidationSchema = Yup.object().shape({
  companyName: Yup.string().required("Company Name is required"),
  projectTitle: Yup.string().required("Project Title is required"),
  description: Yup.string().required("Description is required"),
  // email: Yup.string()
  //   .email("Must be a valid email")
  //   .max(255)
  //   .required("Email is required"),
  // name: Yup.string().max(255).min(2).required("Please enter a valid name"),
  // phoneNumber: Yup.string()
  //   .matches(/^[0-9]{8,15}$/, "Please enter a valid phone number")
  //   .required("Please enter your phone number"),
});

const formFields = [
  { name: "name", label: "Name" },
  { name: "email", label: "Email" },
  { name: "phoneNumber", label: "Phone Number" },
];
const employed = [
  { label: "Less than 10", value: "low" },
  { label: "11 - 50", value: "mid" },
  { label: "51 - 200", value: "high" },
];

const ProjectInfo = ({ onNext }) => {
  const { formDataState, dispatch } = useFormData();
  const [EmploymentType, setEmploymentType] = React.useState({
    low: true,
    mid: false,
    high: false,
  });
  const { high, low, mid } = EmploymentType;
  const error = [high, low, mid].filter((v) => v).length !== 1;
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmploymentType({
      ...EmploymentType,
      [event.target.value]: event.target.checked,
    });
  };
  return (
    <Formik
      initialValues={formDataState["Client info"]}
      validationSchema={projectInfoValidationSchema}
      onSubmit={(values) => {
        console.log({ CompanyInfo: { ...values } }, "from info");
        dispatch({ type: "updateclientInfo", payload: values });
        onNext(values);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Box>
            <Typography my={2} variant="h6">
              Step 1: Project Information
            </Typography>
            <Stack spacing={2}>
              {formFields.map((item) => (
                <Field
                  key={item.name}
                  name={item.name}
                  as={TextField}
                  label={item.label}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
              ))}
              <FormControl>
                <FormLabel component="legend">
                  How many people are employed at the company?
                </FormLabel>
                {employed.map((employed) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={handleChange}
                        value={employed.value}
                        icon={<CircleOutlined />}
                        checkedIcon={<Circle />}
                      />
                    }
                    label={employed.label}
                  />
                ))}
                <>
                  {error && (
                    <FormHelperText error variant="filled">
                      Pick at least one communication preference
                    </FormHelperText>
                  )}
                </>
              </FormControl>
              <FormControl fullWidth>
                <Field
                  name="companyName"
                  as={TextField}
                  label="Company Name"
                  variant="outlined"
                  fullWidth
                />
                <ErrorMessage name="companyName" component="div">
                  {(msg) => (
                    <FormHelperText error variant="filled">
                      {msg}
                    </FormHelperText>
                  )}
                </ErrorMessage>
              </FormControl>

              <FormControl fullWidth>
                <Field
                  name="projectTitle"
                  as={TextField}
                  label="Project Title"
                  variant="outlined"
                  fullWidth
                />
                <ErrorMessage name="projectTitle" component="div">
                  {(msg) => (
                    <FormHelperText error variant="filled">
                      {msg}
                    </FormHelperText>
                  )}
                </ErrorMessage>
              </FormControl>

              <FormControl fullWidth>
                <Field
                  name="description"
                  as={TextField}
                  label="Description"
                  multiline
                  rows={4}
                  variant="outlined"
                  fullWidth
                />
                <ErrorMessage name="description" component="div">
                  {(msg) => (
                    <FormHelperText error variant="filled">
                      {msg}
                    </FormHelperText>
                  )}
                </ErrorMessage>
              </FormControl>

              <CustomButton
                text="Next"
                type="submit"
                variant="contained"
                disabled={isSubmitting}
              />
            </Stack>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default ProjectInfo;
