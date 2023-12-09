import React, { useEffect } from "react";
import { Formik, Field, Form, FieldProps, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { addDays } from "date-fns";
import { persistor, useTypedDispatch, useTypedSelector } from "../../../store";
import AnimateButton from "../../../components/extended/AnimateButton";
import {
  Social,
  handleSocial,
} from "../../../components/auth/auth-forms/AuthLogin";
import { fetchDevs } from "../../../store/slices/dev.slice";
import { useNavigate, useParams } from "react-router";
import RenderGroup from "./Autocomplete";
import { useAddInterviewMutation } from "../../../store/services/interview.service";
import { toast } from "react-toastify";
import CustomButton from "../../../components/button";
import { Schedule } from "@mui/icons-material";
import { devApi } from "../../../store/services/dev.service";
import { IDev } from "../../../types/devs";
import { Iinterviews } from "../../../types/interviews";
interface SelectParticipantsProps {
  interviewers: IDev[];
  editableInterviewInfo: Iinterviews | null;
  isEditing?: boolean;
  _applicants: IDev[];
  handleSubmit?: (values: InterviewFormValue) => void;
  handleEdit?: (values: InterviewFormValue) => void;
}

// Define the structure of the form values
export interface InterviewFormValue {
  candidate: string;
  interviewer: any;
  meetingLink: string;
  interviewType: string;
  interviewDate: Date | null;
}

const SelectParticipants: React.FC<SelectParticipantsProps> = ({
  interviewers,
  _applicants,
  isEditing,
  editableInterviewInfo,
  handleEdit,
  handleSubmit,
}) => {
  // Get the id parameter from the route
  const { id } = useParams();

  // Define the validation schema for the form
  const validationSchema = Yup.object({
    interviewType: Yup.string().required("Interview type is required"),
    interviewDate: Yup.date().required("Interview date is required"),
  });
  console.log(interviewers, "infofdfj");
  // Define the initial values for the form
  const initialValues: InterviewFormValue = {
    //We assume that as id param has been found, applicant has already been filtered by id in the
    //parent component making it an array of a single item and thus sorted to appear first, so thereofore applicant[0]
    candidate: `${((id || isEditing) && _applicants[0]?.firstName) || ""} ${
      id || (isEditing && _applicants[0]?.lastName) || ""
    }`,
    meetingLink:
      (isEditing &&
        editableInterviewInfo &&
        editableInterviewInfo?.meetingLink) ||
      "",
    //If if its edit, show the interviewer from the interviews data
    interviewer: `${(isEditing && interviewers[0]?.firstName) || ""} ${
      (isEditing && interviewers[0]?.lastName) || ""
    }`,
    interviewType:
      (isEditing &&
        editableInterviewInfo &&
        editableInterviewInfo?.interviewType) ||
      "",
    interviewDate:
      (isEditing &&
        editableInterviewInfo &&
        editableInterviewInfo?.interviewDate) ||
      null,
  };

  const handleSubmitForm = (values: InterviewFormValue) => {
    if (isEditing && handleEdit) {
      // Call the handleEdit function if in edit mode
      handleEdit(values);
    } else if (handleSubmit) {
      // Call the handleSubmit function if not in edit mode
      handleSubmit(values);
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmitForm}
    >
      {({
        isSubmitting,
        handleChange,
        values,
        setFieldValue,
        isValidating,
      }) => (
        <Form>
          <Stack spacing={2}>
            <Typography variant="h5">Select Applicant</Typography>
            <Box>
              {_applicants?.length && (
                <FormControl fullWidth>
                  <InputLabel id="role-label">Select the applicant</InputLabel>
                  <Field
                    name="candidate"
                    as={Select}
                    disabled={!!id}
                    variant="outlined"
                    fullWidth
                    value={values.candidate}
                  >
                    {_applicants.map((applicant) => (
                      <MenuItem
                        key={applicant.id}
                        value={`${applicant?.firstName} ${applicant?.lastName}`}
                      >
                        <Box display={"flex"} alignItems={"center"} gap={1}>
                          <Avatar
                            sx={{ width: 30, height: 30 }}
                            src={applicant.avatar || null}
                          />{" "}
                          <Typography>{`${applicant.firstName} ${applicant.lastName}`}</Typography>
                        </Box>
                      </MenuItem>
                    ))}
                  </Field>
                  <ErrorMessage name="candidate" component="div">
                    {(msg) => (
                      <FormHelperText error variant="filled">
                        {msg}
                      </FormHelperText>
                    )}
                  </ErrorMessage>
                </FormControl>
              )}
            </Box>

            <Typography variant="h5">Choose Interviewer</Typography>
            <Box>
              <FormControl fullWidth>
                <RenderGroup
                  label="Select Interviewer"
                  name="interviewer"
                  data={interviewers}
                  value={values.interviewer}
                />
                <ErrorMessage name="interviewer" component="div">
                  {(msg) => (
                    <FormHelperText error variant="filled">
                      {msg}
                    </FormHelperText>
                  )}
                </ErrorMessage>
              </FormControl>
            </Box>
            <Divider />
            <Typography variant="h5">Add meeting link</Typography>

            <FormControl fullWidth>
              <Field
                name="meetingLink"
                as={TextField}
                placeholder={"URL"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <AnimateButton>
                        <Button
                          href={"https://meet.google.com/?pli=1"}
                          target="_blank"
                          // aria-label={`${key} login button`}
                          // onClick={handler}
                          // disabled={isLoading}
                        >
                          {React.createElement(Social.Google.icon, {
                            htmlColor: Social.Google.color,
                          })}
                        </Button>
                      </AnimateButton>
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                fullWidth
              />
              <ErrorMessage name="meetingLink" component="div">
                {(msg) => (
                  <FormHelperText error variant="filled">
                    {msg}
                  </FormHelperText>
                )}
              </ErrorMessage>
            </FormControl>

            <Typography variant="h5">Choose Interview Type</Typography>
            <Box>
              <FormControl fullWidth>
                <InputLabel id="role-label">
                  Select the Interview Type
                </InputLabel>
                <Field
                  name="interviewType"
                  as={Select}
                  variant="outlined"
                  fullWidth
                >
                  {/* {Object.keys(techRoles).map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))} */}
                  <MenuItem value="technical">Technical Interview</MenuItem>
                  <MenuItem value="behavioral">Behavioral Interview</MenuItem>
                  <MenuItem value="hr">HR Interview</MenuItem>
                </Field>
                <ErrorMessage name="roleType" component="div">
                  {(msg) => (
                    <FormHelperText error variant="filled">
                      {msg}
                    </FormHelperText>
                  )}
                </ErrorMessage>
              </FormControl>
            </Box>
            <Divider />

            <Typography variant="h5">Select Interview Date</Typography>
            <Box>
              <Field name="interviewDate">
                {({ field }: FieldProps<Date | null>) => (
                  <DatePicker
                    label="Interview Date"
                    value={field.value}
                    onChange={(date) => setFieldValue("interviewDate", date)}
                    minDate={new Date()}
                    maxDate={addDays(new Date(), 30)} // Limit to the next 30 days
                    format="MM/dd/yyyy"
                  />
                )}
              </Field>
              <ErrorMessage name="interviewDate" component="div">
                {(msg) => (
                  <FormHelperText error variant="filled">
                    {msg}
                  </FormHelperText>
                )}
              </ErrorMessage>
            </Box>
            {!isEditing && (
              <Box>
                <CustomButton
                  fullWidth
                  type="submit"
                  disabled={isSubmitting || isValidating}
                  text={"Schedule"}
                  endIcon={<Schedule />}
                />
              </Box>
            )}
          </Stack>
        </Form>
      )}
    </Formik>
  );
};
export default SelectParticipants;
