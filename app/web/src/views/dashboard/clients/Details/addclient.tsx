import React from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  FormControl,
  FormControlLabel,
  Checkbox,
  Grid,
  Card,
  Divider,
  Stack,
  FormLabel,
  CardActions,
  useTheme,
  useMediaQuery,
  FormHelperText,
  MenuItem,
  Select,
  FormGroup,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { IinitialValues as FormValues } from "../../../../types/company";
import {
  AccessTimeFilledRounded,
  EditRounded,
  InsertDriveFileRounded,
  VideocamRounded,
} from "@mui/icons-material";
// import IconButton from "@mui/joy/IconButton";
import EditorToolbar, {
  LargeTextField,
} from "../../../../content/applications/Users/settings/EditorToolbar";
import SubCard from "../../../../components/SubCard";
// import CountrySelector from "../../../../content/applications/Users/settings/CountrySelector";

// import Textarea from "@mui/joy/Textarea";
// import FormHelperText from "@mui/joy/FormHelperText";
const initialValues = {
  projectName: "",
  projectDescription: "",
  projectGoals: "",
  budget: "",
  startDate: "",
  projectDuration: "",
  technicalRequirements: "",
  designPreferences: "",
  targetAudience: "",
  competitorAnalysis: "",
  dataContent: "",
  securityCompliance: "",
  integrationsAPIs: "",
  testingQA: "",
  milestones: "",
  methodology: "",
  communicationPreferences: [],
  additionalComments: "",
};

const validate = (values: FormValues) => {
  const errors: Partial<FormValues> = {};

  if (!values.projectName) {
    errors.projectName = "Project name is required";
  }

  if (!values.projectDescription) {
    errors.projectDescription = "Project description is required";
  }

  if (!values.budget) {
    errors.budget = "Budget is required";
  } else if (isNaN(Number(values.budget))) {
    errors.budget = "Budget must be a number";
  }

  if (!values.startDate) {
    errors.startDate = "Start date is required";
  }

  if (!values.projectDuration) {
    errors.projectDuration = "Project duration is required";
  } else if (isNaN(Number(values.projectDuration))) {
    errors.projectDuration = "Project duration must be a number";
  }

  return errors;
};

const communicationOptions = [
  { label: "Email", value: "email", checked: true },
  { label: "Video Calls", value: "video_calls", checked: false },
  { label: "Project Management Tools", value: "project_tools", checked: false },
  // Add more communication options as needed
];

const AddClientForm = () => {
  const handleSubmit = (values) => {
    // Handle form submission (e.g., send data to the server)
    console.log("Form values:", values);
  };
  const [state, setState] = React.useState({
    email: true,
    video_calls: false,
    project_tools: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  //   const { email, project_tools,video_calls } = state;
  const error = communicationOptions.filter((v) => v.value).length !== 2;
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    // <CssVarsProvider disableTransitionOnChange>
    //   <CssBaseline />
    <Grid container>
      <Grid item lg={12}>
        <Typography variant="h4"></Typography>
        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <>
              <form noValidate onSubmit={handleSubmit}>
                <SubCard title="Add a New Client Request">
                  <Box sx={{ mb: 1, px: 2 }}>
                    <Typography variant="h4">Client info</Typography>
                    <Typography variant="caption">
                      Insert a descriptive info about the clients requirements
                    </Typography>
                  </Box>
                  <Divider />

                  <Stack
                    direction={md ? "column" : "row"}
                    spacing={2.5}
                    sx={{ my: 1 }}
                  >
                    <Stack direction={md ? "row" : "column"} spacing={1}>
                      {/* <AspectRatio
                          ratio="1"
                          maxHeight={md ? 260 : 200}
                          sx={{
                            flex: 1,
                            minWidth: md ? 58 : 120,
                            borderRadius: "100%",
                          }}
                        >
                          <img
                            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
                            srcSet="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286&dpr=2 2x"
                            loading="lazy"
                            alt=""
                          />
                        </AspectRatio> */}
                      {/* <IconButton
                        aria-label="upload new picture"
                        size="sm"
                        variant="outlined"
                        color="neutral"
                        sx={{
                          bgcolor: "background.body",
                          position: "absolute",
                          zIndex: 2,
                          borderRadius: "50%",
                          left: 90,
                          top: 175,
                          boxShadow: "sm",
                        }}
                      >
                        <EditRounded />
                      </IconButton> */}
                    </Stack>
                    <Stack spacing={2} sx={{ flexGrow: 1 }}>
                      <Stack spacing={1}>
                        <FormControl
                          sx={{
                            // display: "flex",
                            // flexWrap: "wrap",
                            gap: 2,
                          }}
                        >
                          <Field
                            name="projectName"
                            type="text"
                            as={TextField}
                            label="Project Name or Title"
                            variant="outlined"
                            fullWidth
                          />
                          <ErrorMessage name="projectName" component="div" />
                          <Card sx={{ my: 1 }}>
                            <Box sx={{ mb: 1 }}>
                              <Field
                                name="projectDescription"
                                type="text"
                                as={TextField}
                                label="Project Description"
                                variant="outlined"
                                fullWidth
                                placeholder={
                                  "Write a short description of the project"
                                }
                              />
                              <Typography></Typography>
                            </Box>
                            <Divider />
                            <Stack spacing={2} sx={{ my: 1 }}>
                              <LargeTextField />
                            </Stack>
                          </Card>

                          <ErrorMessage
                            name="projectDescription"
                            component="div"
                          />
                        </FormControl>
                        <FormControl>
                          <Field
                            name="budget"
                            type="text"
                            as={TextField}
                            label="Budget"
                            variant="outlined"
                            fullWidth
                          />
                          <ErrorMessage name="budget" component="div" />
                        </FormControl>
                      </Stack>
                      <Stack direction="column" spacing={2}>
                        <FormControl>
                          <Field
                            name="startDate"
                            type="date"
                            as={TextField}
                            label="Start Date"
                            variant="outlined"
                            fullWidth
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                          <ErrorMessage name="startDate" component="div" />
                        </FormControl>
                        <FormControl
                          // error={Boolean(touched.email && errors.email)}
                          sx={{ flexGrow: 1 }}
                        >
                          <Field
                            name="projectDuration"
                            type="text"
                            as={TextField}
                            label="Project Duration (in days)"
                            variant="outlined"
                            fullWidth
                          />
                          <ErrorMessage
                            name="projectDuration"
                            component="div"
                          />
                        </FormControl>
                        <FormControl>
                          <Typography variant="h6">
                            Communication Preferences
                          </Typography>
                          <Box display="flex">
                            <FormControl
                              required
                              error={error}
                              component="fieldset"
                              sx={{ m: 3 }}
                              variant="standard"
                            >
                              <FormLabel component="legend">Pick two</FormLabel>
                              <FormGroup>
                                {communicationOptions.map((option) => (
                                  <>
                                    <Field
                                      key={option.value}
                                      type="checkbox"
                                      label={option.label}
                                      value={option.value}
                                      as={Checkbox}
                                    />
                                    <FormControlLabel
                                      key={option.value}
                                      name="communicationPreferences"
                                      control={
                                        <Checkbox
                                          checked={option.checked}
                                          onChange={handleChange}
                                          name={option.value}
                                        />
                                      }
                                      label={option.label}
                                    />
                                  </>
                                ))}
                              </FormGroup>
                              <FormHelperText>
                                You can display an error
                              </FormHelperText>
                            </FormControl>
                            <Select>
                              {communicationOptions.map((option) => (
                                <Field
                                  key={option.value}
                                  name="communicationPreferences"
                                  type="checkbox"
                                  label={option.label}
                                  value={option.value}
                                  as={Checkbox}
                                />
                                //   <MenuItem>{option.value}</MenuItem>
                              ))}
                            </Select>
                          </Box>
                        </FormControl>
                      </Stack>
                      <div>{/* <CountrySelector /> */}</div>
                      <div>
                        <FormControl sx={{ display: { sm: "contents" } }}>
                          <FormLabel>Timezone</FormLabel>
                          <Select
                            startAdornment={<AccessTimeFilledRounded />}
                            // defaultValue="1"
                          >
                            <MenuItem value={"1"}>
                              Indochina Time (Bangkok){" "}
                              <Typography ml={0.5}>— GMT+07:00</Typography>
                            </MenuItem>
                            <MenuItem value="2">
                              Indochina Time (Ho Chi Minh City){" "}
                              <Typography ml={0.5}>— GMT+07:00</Typography>
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </div>
                    </Stack>
                  </Stack>
                </SubCard>

                <Card>
                  {/* <CardOverflow
                      sx={{ borderTop: "1px solid", borderColor: "divider" }}
                    > */}
                  <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
                    <Button variant="outlined" color="info">
                      Cancel
                    </Button>
                    <Button variant="contained">Save</Button>
                  </CardActions>
                  {/* </CardOverflow> */}
                </Card>
              </form>
            </>
          )}
        </Formik>
      </Grid>
    </Grid>
  );
};

export default AddClientForm;
