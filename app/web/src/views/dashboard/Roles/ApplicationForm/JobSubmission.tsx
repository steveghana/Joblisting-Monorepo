import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
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
  FormControl,
} from "@mui/material";
import CustomButton from "../../../../components/button";
import FileInput from "./FileInput";
import { Grid } from "@mui/material";
import { availableSkills } from "./skills";
import { useNavigate, useParams } from "react-router";
import { ApplicantsSubmission } from "../../../../types/roles";
import { useAddApplicantsMutation } from "../../../../store/services/application.service";
import { toast } from "react-toastify";
const JobSubmissionContainer: React.FC = () => {
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up("md"));
  const [formData, setFormData] = useState({});
  const { id } = useParams();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const navigate = useNavigate();
  const [addApplicant, { isLoading }] = useAddApplicantsMutation();
  const formFields = [
    { name: "name", label: "Name" },
    { name: "email", label: "Email" },
    { name: "phoneNumber", label: "Phone Number" },
    { name: "address", label: "Address" },
    { name: "years_of_experience", label: "Years of experience" },
  ];

  const handlePersonalInfoSubmit = async (values) => {
    setFormData({ ...formData, ...values, selectedFile });
    try {
      const response = await addApplicant({
        roleId: id,
        ...values,
        resume: selectedFile,
      }).unwrap();
      if (response) {
        navigate("/dashboard/jobs/roles");
        toast.success("You Applied Successfully", {
          position: "bottom-center",
        });
      }
    } catch (error) {
      console.log(error, "from eerror");
    }
  };

  const onFileSelect = (file: File) => setSelectedFile(file);
  const initialState: ApplicantsSubmission = {
    name: "",
    email: "",
    phoneNumber: "",
    coverLetter: "",
    resume: {},
    selectedSkills: [],
    address: "",
    years_of_experience: "",
  };
  return (
    <Grid>
      <Typography variant="h4">Personal Info</Typography>
      <Formik
        initialValues={initialState}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email("Enter a valid email")
            .max(255)
            .required("Email is required"),
          address: Yup.string().required("address is required"),
          years_of_experience: Yup.string().required(
            "years of experience is required and must be a number"
          ),
          selectedSkills: Yup.array().required("Skills are required"),

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
              <FormControl fullWidth>
                <Field
                  key={item.name}
                  name={item.name}
                  as={TextField}
                  label={item.label}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
                <ErrorMessage name={item.name} component="div">
                  {(msg) => (
                    <FormHelperText error variant="filled">
                      {msg}
                    </FormHelperText>
                  )}
                </ErrorMessage>
              </FormControl>
            ))}
            <FormControl fullWidth margin="normal">
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
                    name="selectedSkills"
                    label="Select Skills"
                    variant="outlined"
                    fullWidth
                  />
                )}
              />
              <ErrorMessage name="selectedSkills" component="div">
                {(msg) => (
                  <FormHelperText error variant="filled">
                    {msg}
                  </FormHelperText>
                )}
              </ErrorMessage>
            </FormControl>
            <FormControl fullWidth>
              <FileInput
                name="resume"
                onFileSelect={onFileSelect}
                labelText="Insert Your Resume"
              />
              <ErrorMessage name="resume" component="div">
                {(msg) => (
                  <FormHelperText error variant="filled">
                    {msg}
                  </FormHelperText>
                )}
              </ErrorMessage>
            </FormControl>

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
            ></Box>

            <Box width="100%" display="flex" justifyContent="center">
              <CustomButton
                disabled={isLoading}
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
