import React from "react";
import { Formik, Form, Field } from "formik";
import { Autocomplete, Chip, TextField, Button } from "@mui/material";

interface SkillsFormProps {
  onSubmit: (values: string[]) => void;
  onBack: () => void;
}

const availableSkills = [
  "JavaScript",
  "React",
  "Node.js",
  "Next.js",
  // Add more skills here
];

const SkillsForm: React.FC<SkillsFormProps> = ({ onSubmit, onBack }) => {
  return (
    <Formik
      initialValues={{ selectedSkills: [] }}
      onSubmit={(values) => {
        onSubmit(values.selectedSkills);
      }}
    >
      {({ values, setFieldValue }) => (
        <Form>
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

export default SkillsForm;
