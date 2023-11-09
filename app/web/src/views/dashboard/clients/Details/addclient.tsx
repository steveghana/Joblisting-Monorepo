import React from "react";
import * as Yup from "yup";

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
import CountrySelector from "../../../../content/applications/Users/settings/CountrySelector";
import { Protect } from "../../../../components/auth/requireAuth";

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

const validate =
  //complete validation with Yup
  Yup.object().shape({
    email: Yup.string()
      .email("Enter a valid email")
      .max(255)
      .required("Email is required"),
    name: Yup.string().max(255).min(2).required("Please enter a valid name"),
    projectName: Yup.string()
      .max(255)
      .min(2)
      .required("Please enter a valid name"),
    projectDescription: Yup.string()
      .max(300)
      .min(2)
      .required("Project description is required"),
    budget: Yup.number().max(300).min(2),
    projectDuration: Yup.number()
      .max(300)
      .min(2)
      .required("Enter project duration in days, and it should be a number(s)"),
    startDate: Yup.date().required("Pleas select a valid date"),
    phoneNumber: Yup.string()
      .matches(/^\+?[0-9]{8,15}$/, "Please enter a valid phone number")
      .required("Please enter your phone number"),
  });

const communicationOptions = [
  { label: "Email", value: "email" },
  { label: "Video Calls", value: "video_calls" },
  { label: "Project Management Tools", value: "project_tools" },
  // Add more communication options as needed
];
const formFields = [
  { name: "name", label: "FullName", type: "text" },
  { name: "email", label: "Email", type: "text" },
  { name: "phoneNumber", label: "Phone Number", type: "text" },
  { name: "projectName", label: "Project Name or Title", type: "text" },
  { name: "budget", label: "Budget", type: "text" },
  { name: "startDate", label: "Start Date", type: "date" },
  {
    name: "projectDuration",
    label: "Project Duration (in days)",
    type: "text",
  },
];

const AddClientForm = () => {
  const handleSubmit = (values) => {
    // Handle form submission (e.g., send data to the server)
    console.log("Form values:", values);
  };
  const [communicationType, setcommunicationType] = React.useState({
    email: true,
    video_calls: false,
    project_tools: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setcommunicationType({
      ...communicationType,
      [event.target.name]: event.target.checked,
    });
  };

  const { email, project_tools, video_calls } = communicationType;
  const error =
    [email, project_tools, video_calls].filter((v) => v).length !== 1;
  const twoOrMore =
    [email, project_tools, video_calls].filter((v) => v).length >= 2;
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    // <CssVarsProvider disableTransitionOnChange>
    //   <CssBaseline />
    <Grid container>
      <Grid item md={12} sm={12}>
        <Typography variant="h4"></Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validate}
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
                          {formFields.map((field) => (
                            <>
                              <Field
                                name={field.name}
                                type={field.type}
                                as={TextField}
                                label={field.type !== "date" && field.label}
                                placeholder={
                                  field.type === "date" && field.label
                                }
                                variant="outlined"
                                fullWidth
                              />
                              <ErrorMessage name={field.name} component="div" />
                            </>
                          ))}
                          <div>
                            <CountrySelector />
                          </div>
                          <Divider />
                          <Card sx={{ my: 1 }}>
                            <Stack spacing={2} sx={{ my: 1 }}>
                              <LargeTextField />
                            </Stack>
                          </Card>

                          <ErrorMessage
                            name="projectDescription"
                            component="div"
                          />
                        </FormControl>
                      </Stack>
                      <Stack direction="column" spacing={2}>
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
                              <FormLabel component="legend">Pick One</FormLabel>
                              <FormGroup>
                                {communicationOptions.map((option) => (
                                  <>
                                    <FormControlLabel
                                      key={option.value}
                                      name="communicationPreferences"
                                      control={
                                        <Checkbox
                                          checked={
                                            communicationType[option.value]
                                          }
                                          name={option.value}
                                          onChange={handleChange}
                                        />
                                      }
                                      label={option.label}
                                    />
                                  </>
                                ))}
                              </FormGroup>
                              {twoOrMore && (
                                <FormHelperText>
                                  You can only pick a single item
                                </FormHelperText>
                              )}
                            </FormControl>
                          </Box>
                        </FormControl>
                      </Stack>
                      <div>
                        <FormControl
                          //   fullWidth
                          fullWidth
                          //   sx={{ display: { sm: "contents" } }}
                        >
                          <FormLabel>Timezone</FormLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={"— GMT+07:00"}
                            placeholder="Selecet time zone"
                            onChange={handleChange}
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
export default Protect(AddClientForm, ["Ceo"]);
