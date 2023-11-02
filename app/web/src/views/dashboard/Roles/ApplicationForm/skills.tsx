import React from "react";
import { Formik, Form, Field } from "formik";
import {
  Autocomplete,
  Chip,
  TextField,
  Button,
  Box,
  Typography,
} from "@mui/material";
import CustomButton from "../../../../components/button";

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
    <>
      <Typography variant="h4">Add Skills</Typography>

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
                disabled={values.selectedSkills.length === 0}
                // fullWidth={matchUpMd ? false : true}
                text="Next"
                type="submit"
              />
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default SkillsForm;
