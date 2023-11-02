import React from "react";
import { Formik, Form, Field } from "formik";
import { TextField, Button, Typography, Box } from "@mui/material";
import CustomButton from "../../../../components/button";

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
          <Box
            width={"100%"}
            gap={1}
            display={"flex"}
            justifyContent={"center"}
          >
            <CustomButton
              variant="outlined"
              onClick={onBack}
              // fullWidth={matchUpMd ? false : true}
              text="Back"
              type="submit"
            />
            <CustomButton
              variant="contained"
              // fullWidth={matchUpMd ? false : true}
              text="Next"
              type="submit"
            />
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default AvailabilityForm;
