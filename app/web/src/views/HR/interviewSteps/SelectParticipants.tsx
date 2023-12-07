import React from "react";
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
import { useTypedDispatch, useTypedSelector } from "../../../store";
import AnimateButton from "../../../components/extended/AnimateButton";
import {
  Social,
  handleSocial,
} from "../../../components/auth/auth-forms/AuthLogin";
import { fetchDevs } from "../../../store/slices/devslice";
import { useParams } from "react-router";
import RenderGroup from "./Autocomplete";

interface SelectParticipantsProps {
  onNext: (values: FormValues) => void;
}

interface FormValues {
  candidate: string;
  interviewer: string;
  meetingLink: string;
  interviewType: string;
  interviewDate: Date | null;
}

const SelectParticipants: React.FC<SelectParticipantsProps> = ({ onNext }) => {
  const { id } = useParams();
  const __state = useTypedSelector((state) => state.devs.devs);
  const __applicant =
    id &&
    __state.find((item) => item.id === id && item.rolestatus === "Pending");
  const __allApplicants =
    __state?.length && __state.filter((item) => item.rolestatus === "Pending");
  // const dispatch = useTypedDispatch();
  console.log(__applicant, "this is the state");
  const __validationSchema = Yup.object({
    interviewType: Yup.string().required("Interview type is required"),
    interviewDate: Yup.date().required("Interview date is required"),
  });

  // React.useEffect(() => {
  //   dispatch(fetchDevs());
  // }, []);

  const _initialValues: FormValues = {
    candidate: `${__applicant.firstName} ${__applicant.lastName}`,
    meetingLink: "",
    interviewer: "",
    interviewType: "",
    interviewDate: null,
  };
  const handleSubmit = (values: FormValues) => {
    console.log(values);
    // onNext(values);
  };

  return (
    <Formik
      initialValues={_initialValues}
      // validationSchema={__validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, handleChange, values, setFieldValue }) => (
        <Form>
          <Stack spacing={2}>
            <Box>
              <Typography variant="h5">Select Applicant</Typography>
              <FormControl fullWidth>
                {/* <InputLabel id="role-label">Select the __applicant</InputLabel> */}
                <Field
                  name="candidate"
                  as={Select}
                  variant="outlined"
                  disabled={__applicant.id.length > 0}
                  fullWidth
                  // value={values.candidate}
                >
                  <MenuItem
                    value={`${__applicant.firstName} ${__applicant.lastName}`}
                  >
                    <Box
                      display={"flex"}
                      // justifyContent={"space-between"}
                      alignItems={"center"}
                      gap={1}
                    >
                      <Avatar
                        sx={{ width: 30, height: 30 }}
                        src={__applicant.avatar || null}
                      />{" "}
                      <Typography>{`${__applicant.firstName} ${__applicant.lastName}`}</Typography>
                      {/* <Typography>{`${state.email}`}</Typography>
                    <Typography>{`${state.experience}`}</Typography> */}
                    </Box>
                  </MenuItem>
                </Field>
                <ErrorMessage name="candidate" component="div">
                  {(msg) => (
                    <FormHelperText error variant="filled">
                      {msg}
                    </FormHelperText>
                  )}
                </ErrorMessage>
              </FormControl>
            </Box>

            <Typography variant="h5">Choose Interviewer</Typography>
            <Box>
              <FormControl fullWidth>
                <RenderGroup
                  label="Select Interviewer"
                  name="interviewer"
                  data={__allApplicants}
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

            <Box>
              <Typography variant="h5">Select Interview Date</Typography>
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
            <Box>
              <Button type="submit" variant="contained" color="primary">
                Next
              </Button>
            </Box>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};
export default SelectParticipants;
