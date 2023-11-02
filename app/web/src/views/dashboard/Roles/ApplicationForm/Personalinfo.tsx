import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  useTheme,
  useMediaQuery,
  Box,
  Typography,
  FormHelperText,
} from "@mui/material";
import CustomButton from "../../../../components/button";
import FileInput from "./FileInput";

const PersonalInfoForm = ({ onSubmit }) => {
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up("md"));

  const formFields = [
    { name: "name", label: "Name" },
    { name: "email", label: "Email" },
    { name: "phoneNumber", label: "Phone Number" },
  ];

  return (
    <>
      <Typography variant="h4">Personal Info</Typography>
      <Formik
        initialValues={{ name: "", email: "", phoneNumber: "" }}
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
        onSubmit={onSubmit}
      >
        {({ values, errors, touched, handleSubmit, isSubmitting }) => (
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
            <Field
              name="resume"
              component={FileInput} // Custom component for file input
            />

            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{ mt: 3 }}
            >
              <FormHelperText error>
                {errors.name || errors.email || errors.phoneNumber}
              </FormHelperText>
            </Box>

            <Box width="100%" display="flex" justifyContent="center">
              <CustomButton
                fullWidth={!matchUpMd}
                text="Next"
                type="submit"
                variant="contained"
              />
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default PersonalInfoForm;
