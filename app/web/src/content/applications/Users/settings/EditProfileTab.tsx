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
} from "@mui/material";
import { gridSpacing } from "../../../../store/constant";

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
                  <Grid container>
                    <Grid item xs={12} sm={4} mr={2}>
                      <SubCard title="Personal information">
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
                      </SubCard>
                    </Grid>
                  </Grid>
                  <Grid container lg={8} xs={12} sm={12} spacing={gridSpacing}>
                    <Grid item xs={12} sm={12}>
                      <SubCard title="Personal information">
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
                      </SubCard>
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

                <Box sx={{ mt: 2 }}>
                  <AnimateButton>
                    <CustomButton
                      disableElevation
                      disabled={isSubmitting}
                      fullWidth
                      size="large"
                      variant="contained"
                      text="Sign up"
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
