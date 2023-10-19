import {
  Grid,
  Typography,
  CardContent,
  Card,
  Box,
  Divider,
  Button,
  TextField,
  FormHelperText,
  FormControl,
  InputLabel,
  OutlinedInput,
  Select,
  MenuItem,
} from "@mui/material";
import { gridSpacing } from "../../../../store/constant";
import MuiTypography from "@mui/material/Typography";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DoneTwoToneIcon from "@mui/icons-material/DoneTwoTone";
import Text from "../../../../components/Text";
import Label from "../../../../components/Label";
import SubCard from "../../../../ui-component/cards/SubCard";
import { Formik } from "formik";
import { themeTypography } from "../../../../themes/schemes/typography";
import AnimateButton from "../../../../ui-component/extended/AnimateButton";
import CustomButton from "../../../../components/button";
import MainCard from "../../../../ui-component/cards/MainCard";
function EditProfileTab({ ...others }) {
  // const []
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card>
          <Formik
            initialValues={{
              email: "",
              password: "",
              firstName: "",
              lastName: "",
              role: "Ceo" || "Marketing" || "Recruitment" || "Developer",
              submit: null,
            }}
            onSubmit={async (values, setters) => {
              console.log(values, "from submitting");
              // await register(values, setters, scriptedRef);
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values,
            }) => (
              <form noValidate onSubmit={handleSubmit} {...others}>
                <MainCard>
                  {/* <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <SubCard title="Personal information">
                        
                      </SubCard>
                    </Grid>
                  </Grid> */}
                  {/* <Grid container xs={12} sm={6} spacing={gridSpacing}>
                    <Grid item xs={12} sm={12}>
                      <SubCard title="Personal information">
                        
                      </SubCard>
                    </Grid>
                  </Grid> */}
                  <Grid container>
                    <Grid item xs={12} sm={6} mr={2}>
                      <SubCard title="Personal Information">
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              label="First Name"
                              margin="normal"
                              value={values.firstName}
                              name="firstName"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              type="text"
                              defaultValue=""
                              sx={{ ...themeTypography.customInput }}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              value={values.lastName}
                              label="Last Name"
                              margin="normal"
                              name="lastName"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              type="text"
                              defaultValue=""
                              sx={{ ...themeTypography.customInput }}
                            />
                          </Grid>
                        </Grid>
                        <FormControl
                          fullWidth
                          error={Boolean(touched.email && errors.email)}
                          sx={{ ...themeTypography.customInput }}
                        >
                          <InputLabel htmlFor="outlined-adornment-email-register">
                            Email Address / Username
                          </InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-email-register"
                            type="email"
                            value={values.email}
                            name="email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            inputProps={{}}
                          />
                          {touched.email && errors.email && (
                            <FormHelperText
                              error
                              id="standard-weight-helper-text--register"
                            >
                              {errors.email}
                            </FormHelperText>
                          )}
                          <FormControl
                            sx={{ m: 1, minWidth: 50 }}
                            size="medium"
                          >
                            <InputLabel id="demo-select-small-label">
                              Age
                            </InputLabel>
                            <Select
                              labelId="demo-select-small-label"
                              id="demo-select-small"
                              sx={{
                                ...themeTypography.customInput,
                                // width: "50%",
                              }}
                              autoWidth
                              // value={age}
                              label="Age"
                              onChange={handleChange}
                            >
                              <MenuItem value="">
                                <em>None</em>
                              </MenuItem>
                              <MenuItem value={10}>Ten</MenuItem>
                              <MenuItem value={20}>Twenty</MenuItem>
                              <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                          </FormControl>
                        </FormControl>
                      </SubCard>
                    </Grid>
                    <Grid
                      container
                      sm={6}
                      xs={12}
                      // sm={12}
                      spacing={gridSpacing}
                    >
                      <Grid item xs={12} sm={12}>
                        <SubCard title="Contact details">
                          <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                fullWidth
                                label="First Name"
                                margin="normal"
                                value={values.firstName}
                                name="firstName"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                type="text"
                                defaultValue=""
                                sx={{ ...themeTypography.customInput }}
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                fullWidth
                                value={values.lastName}
                                label="Last Name"
                                margin="normal"
                                name="lastName"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                type="text"
                                defaultValue=""
                                sx={{ ...themeTypography.customInput }}
                              />
                            </Grid>
                          </Grid>
                          <FormControl
                            fullWidth
                            error={Boolean(touched.email && errors.email)}
                            sx={{ ...themeTypography.customInput }}
                          >
                            <InputLabel htmlFor="outlined-adornment-email-register">
                              Email Address / Username
                            </InputLabel>
                            <OutlinedInput
                              id="outlined-adornment-email-register"
                              type="email"
                              value={values.email}
                              name="email"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              inputProps={{}}
                            />
                            {touched.email && errors.email && (
                              <FormHelperText
                                error
                                id="standard-weight-helper-text--register"
                              >
                                {errors.email}
                              </FormHelperText>
                            )}
                          </FormControl>
                          <Grid item xs={12}>
                            <TextField
                              fullWidth
                              value={values.lastName}
                              label="Bio"
                              margin="normal"
                              name="Bio"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              type="text"
                              multiline
                              rows={4}
                              defaultValue=""
                              id="standard-multiline-static"
                              sx={{
                                ...themeTypography.customInput,
                                width: "100%",
                              }}
                            />
                          </Grid>
                        </SubCard>
                      </Grid>
                    </Grid>
                  </Grid>
                </MainCard>

                {errors.submit && (
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    sx={{ mt: 3 }}
                  >
                    <FormHelperText error>
                      {errors.submit as string}
                    </FormHelperText>
                  </Box>
                )}

                <Box sx={{ mt: 2 }} display={"flex"} justifyContent="center">
                  <AnimateButton>
                    <CustomButton
                      disableElevation
                      disabled={isSubmitting}
                      // fullWidth
                      size="large"
                      variant="contained"
                      text="Save"
                      type="submit"

                      // color="secondary"
                    />
                  </AnimateButton>
                </Box>
              </form>
            )}
          </Formik>
        </Card>
      </Grid>
    </Grid>
  );
}

export default EditProfileTab;
