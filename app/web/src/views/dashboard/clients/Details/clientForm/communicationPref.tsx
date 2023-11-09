import React from "react";
import * as Yup from "yup";
import {
  FormControl,
  Checkbox,
  FormGroup,
  FormLabel,
  FormHelperText,
  Stack,
  CardActions,
  FormControlLabel,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import SubCard from "../../../../../components/SubCard";
import CustomButton from "../../../../../components/button";
import { useNavigate } from "react-router";

// const communicationPreferencesValidationSchema = Yup.object().shape({
//   communicationPreferences: Yup.array()
//     .min(1, "")
//     .max(1, ""),
// });

const CommunicationPreferences = ({ onNext }) => {
  const communicationOptions = [
    { label: "Email", value: "email" },
    { label: "Video Calls", value: "video_calls" },
    { label: "Project Management Tools", value: "project_tools" },
  ];
  const navigate = useNavigate();
  const [communicationType, setcommunicationType] = React.useState({
    email: true,
    video_calls: false,
    project_tools: false,
  });
  const { email, project_tools, video_calls } = communicationType;
  const error =
    [email, project_tools, video_calls].filter((v) => v).length !== 1;
  const twoOrMore =
    [email, project_tools, video_calls].filter((v) => v).length >= 2;
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setcommunicationType({
      ...communicationType,
      [event.target.name]: event.target.checked,
    });
  };
  return (
    <Formik
      initialValues={{
        communicationPreferences: "",
      }}
      onSubmit={(values) => {
        values.communicationPreferences = Object.keys(communicationType).find(
          (preference) => communicationType[preference] === true
        );
        onNext(values);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <SubCard title="Step 3: Communication Preferences">
            <Stack spacing={2}>
              <FormControl
                required
                component="fieldset"
                sx={{ m: 3 }}
                variant="standard"
              >
                <FormLabel component="legend">Pick One</FormLabel>
                <FormGroup>
                  {communicationOptions.map((option) => (
                    <>
                      <FormControlLabel
                        key={option.value}
                        name="communicationPreferences"
                        control={
                          <Checkbox
                            checked={communicationType[option.value]}
                            name={option.value}
                            onChange={handleChange}
                          />
                        }
                        label={option.label}
                      />
                    </>
                  ))}
                </FormGroup>
                <>
                  {twoOrMore ? (
                    <FormHelperText error variant="filled">
                      Pick only one communication preference
                    </FormHelperText>
                  ) : error ? (
                    <FormHelperText error variant="filled">
                      Pick at least one communication preference
                    </FormHelperText>
                  ) : null}
                </>
              </FormControl>
            </Stack>
            <CardActions sx={{ justifyContent: "space-between", pt: 2 }}>
              <CustomButton text="Back" variant="outlined" />
              <CustomButton
                text="Submit"
                disabled={error || twoOrMore}
                variant="contained"
                type="submit"
              />
            </CardActions>
          </SubCard>
        </Form>
      )}
    </Formik>
  );
};

export default CommunicationPreferences;
