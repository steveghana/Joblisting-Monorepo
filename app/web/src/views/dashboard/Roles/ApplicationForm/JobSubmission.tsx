import React, { useState } from "react";
import PersonalInfoForm from "./Personalinfo";
import WorkExperienceForm from "./experience";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  TextField,
  useTheme,
  useMediaQuery,
  Box,
  Typography,
  FormHelperText,
  Autocomplete,
  Chip,
} from "@mui/material";
import CustomButton from "../../../../components/button";
import FileInput from "./FileInput";
import SkillsForm from "./skills";
import AdditionalInfoForm from "./additionalnfo";
import { Grid } from "@mui/material";

const JobSubmissionContainer: React.FC = () => {
  const availableSkills = [
    "JavaScript",
    "React",
    "Node.js",
    "Next.js",
    // Add more skills here
  ];
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up("md"));
  const [formData, setFormData] = useState({});
  const [step, setStep] = useState(1);

  const formFields = [
    { name: "name", label: "Name" },
    { name: "email", label: "Email" },
    { name: "phoneNumber", label: "Phone Number" },
  ];

  const handlePersonalInfoSubmit = (values: any) => {
    console.log(values);
    // if (values.filter((value) => !value.name.length)) return;

    setFormData({ ...formData, ...values });
    setStep(step + 1);
  };

  // const handleAvailabilitySubmit = (value: string) => {
  //   setFormData({ ...formData, availability: value });
  //   setStep(step + 1);
  // };

  const handleAdditionalInfoSubmit = (value: string) => {
    setFormData({ ...formData, coverLetter: value });
    // Handle final form submission here
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  return (
    <Grid>
      <Typography variant="h4">Personal Info</Typography>
      <Formik
        initialValues={{
          name: "",
          email: "",
          phoneNumber: "",
          selectedSkills: [],
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email("Must be a valid email")
            .max(255)
            .required("Email is required"),
          name: Yup.string()
            .max(255)
            .min(2)
            .required("Please enter a valid name"),
          phoneNumber: Yup.string()
            .matches(/^[0-9]{8,15}$/, "Please enter a valid phone number")
            .required("Please enter your phone number"),
        })}
        onSubmit={handlePersonalInfoSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleSubmit,
          isSubmitting,
          setFieldValue,
        }) => (
          <Form>
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

            <Autocomplete
              multiple
              id="skills-autocomplete"
              options={availableSkills}
              value={values.selectedSkills}
              onChange={(_, newValue) => {
                setFieldValue("selectedSkills", newValue.slice(0, 10)); // Limit to 10 skills
              }}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip label={option} {...getTagProps({ index })} />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Skills"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
            <Field
              name="resume"
              component={FileInput} // Custom component for file input
            />
            <Field
              name="coverLetter"
              as={TextField}
              label="Cover Letter"
              variant="outlined"
              fullWidth
              margin="normal"
              multiline
              rows={8}
            />

            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{ mt: 3 }}
            >
              {/* <FormHelperText error>{errors.Name}</FormHelperText> */}
            </Box>

            <Box width="100%" display="flex" justifyContent="center">
              <CustomButton
                fullWidth={!matchUpMd}
                text="Submit application "
                type="submit"
                variant="contained"
              />
            </Box>
          </Form>
        )}
      </Formik>
    </Grid>
  );
};

export default JobSubmissionContainer;
