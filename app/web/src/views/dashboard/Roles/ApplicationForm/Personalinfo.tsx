import React from "react";
import { Formik, Form, Field } from "formik";
import {
  TextField,
  Button,
  useTheme,
  useMediaQuery,
  OutlinedInput,
  Box,
} from "@mui/material";
import CustomButton from "../../../../components/button";

const PersonalInfoForm = ({ onSubmit }) => {
  const theme = useTheme();

  const matchUpMd = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Formik
      initialValues={{ name: "", email: "", phoneNumber: "" }}
      onSubmit={onSubmit}
    >
      {({
        values,
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
      }) => (
        <Form>
          <Field
            name="name"
            value={values.name}
            as={TextField}
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <Field
            name="email"
            as={TextField}
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <Field
            name="phoneNumber"
            as={TextField}
            label="Phone Number"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <Box width={"100%"} display={"flex"} justifyContent={"center"}>
            <CustomButton
              fullWidth={matchUpMd ? false : true}
              text="Next"
              type="submit"
            />
          </Box>
          {/* <Button type="submit" variant="contained" color="primary">
            Next
          </Button> */}
        </Form>
      )}
    </Formik>
  );
};

export default PersonalInfoForm;
