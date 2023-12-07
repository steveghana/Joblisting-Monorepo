import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Grid,
  Box,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import SubCard from "../../../../components/SubCard";
import { Stack } from "@mui/system";

interface NewRoleFormProps {
  open: boolean;
  onClose: () => void;
  //   onOPen: () => void;
}
const Duration = [
  { label: "Less than a week" },
  { label: "1 to 4 weeks" },
  { label: "1 to 3 months" },
  { label: "3 to 6 months" },
  { label: "Longer than 6 months" },
  { label: "I will decide later" },
];
const whenToStart = [
  { label: "Immediately" },
  { label: "In 1 to 2 weeks" },
  { label: "More than 2 weeks from now" },
  { label: "I'll decide later" },
];

const NewRoleForm: React.FC<NewRoleFormProps> = ({ open, onClose }) => {
  const initialValues = {
    roleName: "",
    jobDescription: "",
    department: "", // Example additional field
    experienceLevel: "",
    whenToStart: "", // Example additional field
  };
  const handleSubmit = (values: any) => {
    // Handle form submission logic here
    console.log("Submitted values:", values);
    onClose(); // Close the modal after submission
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xl" fullWidth>
      <Grid container lg={12}>
        {/* <SubCard> */}
        <Grid item lg={12} width={"100%"}>
          <DialogTitle variant="h4">Create New Role</DialogTitle>

          <DialogContent>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
              {({ isSubmitting, handleChange, values }) => (
                <Form>
                  <Stack spacing={2}>
                    <FormControl fullWidth>
                      <Field
                        as={TextField}
                        fullWidth
                        name="roleName"
                        label="Role Name"
                        variant="outlined"
                      />
                    </FormControl>
                    <FormControl fullWidth>
                      <Field
                        as={TextField}
                        name="jobDescription"
                        multiline
                        rows={4}
                        label="Job Description"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel component="legend">
                        When do you need the developer to start?
                      </FormLabel>
                      {whenToStart.map((startDay) => (
                        <RadioGroup
                          aria-label="items"
                          name="whenToStart"
                          value={values.whenToStart}
                          onChange={handleChange}
                          row
                        >
                          <FormControlLabel
                            value={startDay.label}
                            control={<Radio />}
                            label={startDay.label}
                          />
                        </RadioGroup>
                      ))}
                    </FormControl>
                    <FormControl fullWidth>
                      <InputLabel id="department-label">Department</InputLabel>
                      <Field as={Select} name="department" label="Department">
                        <MenuItem value="engineering">Engineering</MenuItem>
                        <MenuItem value="marketing">Marketing</MenuItem>
                      </Field>
                    </FormControl>
                    <FormControl fullWidth>
                      <InputLabel id="experience-label">
                        Experience Level
                      </InputLabel>
                      <Field
                        as={Select}
                        name="experienceLevel"
                        label="Experience Level"
                      >
                        <MenuItem value="entry">Entry Level</MenuItem>
                        <MenuItem value="mid">Mid Level</MenuItem>
                        <MenuItem value="senior">Senior Level</MenuItem>
                      </Field>
                    </FormControl>

                    <DialogActions>
                      <Button type="submit" variant="contained" color="primary">
                        Create
                      </Button>
                      <Button
                        onClick={onClose}
                        variant="outlined"
                        color="secondary"
                      >
                        Cancel
                      </Button>
                    </DialogActions>
                  </Stack>
                </Form>
              )}
            </Formik>
          </DialogContent>
        </Grid>
        {/* </SubCard> */}
      </Grid>
    </Dialog>
  );
};

export default NewRoleForm;
