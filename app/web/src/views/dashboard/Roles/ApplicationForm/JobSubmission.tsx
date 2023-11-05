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
import { Grid } from "@mui/material";
import { availableSkills } from "./skills";
import { useNavigate } from "react-router";
const JobSubmissionContainer: React.FC = () => {
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up("md"));
  const [formData, setFormData] = useState({});
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const navigate = useNavigate();
  const formFields = [
    { name: "name", label: "Name" },
    { name: "email", label: "Email" },
    { name: "phoneNumber", label: "Phone Number" },
  ];

  const handlePersonalInfoSubmit = (values: any) => {
    setFormData({ ...formData, ...values, selectedFile });
    //Save data in the database : TO DO
    //TOD): add a global snackbar and context for toggling the snackbar globally
    navigate("/dashboard/jobs/roles");
  };

  const onFileSelect = (file: File) => setSelectedFile(file);

  return (
    <Grid>
      <Typography variant="h4">Personal Info</Typography>
      <Formik
        initialValues={{
          name: "",
          email: "",
          phoneNumber: "",
          coverLetter: "",
          selectedSkills: [],
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email("Enter a valid email")
            .max(255)
            .required("Email is required"),
          name: Yup.string()
            .max(255)
            .min(2)
            .required("Please enter a valid name"),
          phoneNumber: Yup.string()
            .matches(/^\+?[0-9]{8,15}$/, "Please enter a valid phone number")
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
            <FileInput
              name="File"
              onFileSelect={onFileSelect}
              labelText="Insert Your Resume"
            />

            <Field
              name="coverLetter"
              as={TextField}
              label="Cover Letter"
              variant="outlined"
              fullWidth
              margin="normal"
              multiline
              rows={6}
            />

            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{ mt: 3 }}
            >
              <FormHelperText error>{errors.name as string}</FormHelperText>
              <FormHelperText error>{errors.email as string}</FormHelperText>
              <FormHelperText error>
                {errors.phoneNumber as string}
              </FormHelperText>
            </Box>

            <Box width="100%" display="flex" justifyContent="center">
              <CustomButton
                fullWidth={!matchUpMd}
                text="Submit application"
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
