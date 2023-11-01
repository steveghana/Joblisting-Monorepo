import React from "react";
import { Formik, Form, Field } from "formik";
import { TextField, Button, Typography } from "@mui/material";

interface AvailabilityData {
  availability: string;
}

interface AvailabilityFormProps {
  onSubmit: (values: string) => void;
  onBack: () => void;
}

const AvailabilityForm: React.FC<AvailabilityFormProps> = ({
  onSubmit,
  onBack,
}) => {
  return (
    <Formik
      initialValues={{ availability: "" }}
      onSubmit={(values) => {
        onSubmit(values.availability);
      }}
    >
      {() => (
        <Form>
          <Field
            name="availability"
            as={TextField}
            label="Availability"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={4}
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

export default AvailabilityForm;
