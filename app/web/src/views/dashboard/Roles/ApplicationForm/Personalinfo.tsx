import React from "react";
import { Formik, Form, Field } from "formik";
import { TextField, Button } from "@mui/material";

const PersonalInfoForm = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{ name: "", email: "", phoneNumber: "" }}
      onSubmit={onSubmit}
    >
      {() => (
        <Form>
          <Field
            name="name"
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
          <Button type="submit" variant="contained" color="primary">
            Next
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default PersonalInfoForm;
