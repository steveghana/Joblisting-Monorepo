import React from "react";
import { Formik, Form, Field } from "formik";
import { TextField, Button } from "@mui/material";

interface AdditionalInfoData {
  coverLetter: string;
}

interface AdditionalInfoFormProps {
  onSubmit: (values: string) => void;
  onBack: () => void;
}

const AdditionalInfoForm: React.FC<AdditionalInfoFormProps> = ({
  onSubmit,
  onBack,
}) => {
  return (
    <Formik
      initialValues={{ coverLetter: "" }}
      onSubmit={(values) => {
        onSubmit(values.coverLetter);
      }}
    >
      {() => (
        <Form>
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
          <Button onClick={onBack} variant="outlined">
            Back
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Submit Application
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default AdditionalInfoForm;
