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

interface SelectParticipantsProps {
  onNext: (values: FormValues) => void;
}

interface FormValues {
  candidate: string;
  interviewer: any;
  meetingLink: string;
  interviewType: string;
  interviewDate: Date | null;
}

const SelectParticipants: React.FC<SelectParticipantsProps> = ({ onNext }) => {
  const { id } = useParams();
  const state = useTypedSelector((state) => state);
  const __state = useTypedSelector((state) => state.devs.devs);
  const dispatch = useTypedDispatch();
  const [addInterview, { isError, isLoading }] = useAddInterviewMutation();
  const navigate = useNavigate();
  const __applicant =
    id &&
    __state.find((item) => item.id === id && item.rolestatus === "Pending");
  const __allApplicants =
    __state?.length && __state.filter((item) => item.rolestatus === "Pending");
  const __validationSchema = Yup.object({
    interviewType: Yup.string().required("Interview type is required"),
    interviewDate: Yup.date().required("Interview date is required"),
  });
  const _initialValues: FormValues = {
    candidate: `${__applicant?.firstName || ""} ${__applicant?.lastName || ""}`,
    meetingLink: "",
    interviewer: "",
    interviewType: "",
    interviewDate: null,
  };
  console.log(state);
  useEffect(() => {
    dispatch(fetchDevs());
  }, []);
  const handleSubmit = async (values: FormValues) => {
    const {
      candidate,
      interviewDate,
      interviewType,
      interviewer,
      meetingLink,
    } = values;
    const trimedCandidate = candidate.trim().toLowerCase();

    const candidateInfo = __state.find(
      (candidate) =>
        `${candidate.firstName} ${candidate.lastName}`.trim().toLowerCase() ===
        trimedCandidate
    );
    try {
      const response = await addInterview({
        candidateId: candidateInfo.id,
        interviewerId: interviewer.id,
        scheduled_date: interviewDate,
        status: "Scheduled",
      }).unwrap();
      await devApi.util.invalidateTags(["devs"]);
      console.log(response, "this is the response");
      if (response && !isError) {
        dispatch(fetchDevs()); // update the persisted data
        await persistor.flush();
        navigate("/devs/interviews");
      }
      toast.success("interview Scheduled Succesfully", {
        position: "bottom-center",
      });
    } catch (error) {
      toast.error("Could not Schedule interview", {
        position: "bottom-center",
      });
    }
    console.log(candidateInfo, values);
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
              {__applicant && (
                <FormControl fullWidth>
                  {/* <InputLabel id="role-label">Select the __applicant</InputLabel> */}
                  <Field
                    name="candidate"
                    as={Select}
                    variant="outlined"
                    disabled={!!__applicant}
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
              )}
              {__allApplicants.length && !__applicant && (
                <FormControl fullWidth>
                  <InputLabel id="role-label">Select the applicant</InputLabel>
                  <Field
                    name="candidate"
                    as={Select}
                    variant="outlined"
                    fullWidth
                    value={values.candidate}
                  >
                    {__allApplicants.map((applicant) => (
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
            <Box>
              <CustomButton
                fullWidth
                type="submit"
                disabled={isLoading}
                text="Schedule"
                endIcon={<Schedule />}
              />
            </Box>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};
export default SelectParticipants;
