import React, { useState } from "react";
import { useSelector } from "react-redux";
import api from "../../../api/_api";
// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";

// third party
import * as Yup from "yup";
import { Formik } from "formik";

// project imports
// import useScriptRef from 'hooks/useScriptRef';
// import AnimateButton from 'ui-component/extended/AnimateButton';

// assets
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AnimateButton from "../../extended/AnimateButton";
import useScriptRef from "../../../hooks/useScriptRef";
import { themeTypography } from "../../../themes/schemes/typography";
import CustomButton from "../../button";
import { GitHub, Google, LinkedIn } from "@mui/icons-material";
import { useLoginUserMutation } from "../../../store/services/userAuthService";
import { useNavigate } from "react-router";
const Social = {
  Github: {
    color: "#131418",
    icon: GitHub,
  },
  Linkedin: {
    color: "#0077B5",
    icon: LinkedIn,
  },

  Google: {
    color: "red",
    icon: () => (
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1004px-Google_%22G%22_Logo.svg.png"
        width={20}
        height={20}
      />
    ),
  },
};
// import Google from 'assets/images/icons/social-google.svg';

// ============================|| FIREBASE - LOGIN ||============================ //

const FirebaseLogin = ({ ...others }) => {
  const theme = useTheme();
  const scriptedRef = useScriptRef();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  const customization = useSelector((state: any) => state.customization);
  const router = useNavigate();

  const [checked, setChecked] = useState(true);
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const googleHandler = async () => {
    console.error("Login");
  };
  async function login(values, setters, scriptedRef) {
    try {
      // const s = await api.user.login(values.email, values.password, false);
      const data = await loginUser({
        password: values.password,
        email: values.email,
        rememberMe: false,
      }).unwrap();

      if (!data) return;
      const { authTokenId, role } = data;
      // console.log(authTokenId, role);
      if (!authTokenId) return;
      localStorage.setItem("auth_token", authTokenId);
      localStorage.setItem("role", role);

      if (scriptedRef.current) {
        setters.setStatus({ success: true });
        setters.setSubmitting(false);
      }
      router("/dashboard/default");
      return true;
    } catch (error) {
      setters.setStatus({ success: false });
      setters.setErrors({ submit: error.data });
      setters.setSubmitting(false);
    }
  }

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  let handleSocial = {
    Google: () => {},
    Github: () => {},
    Linkedin: () => {},
  };
  return (
    <>
      <Formik
        initialValues={{
          email: "steve@svtech.com",
          password: "123456",
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email("Must be a valid email")
            .max(255)
            .required("Email is required"),
          password: Yup.string().max(255).required("Password is required"),
        })}
        onSubmit={async (values, setters) => {
          await login(values, setters, scriptedRef);
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
            <FormControl
              fullWidth
              error={Boolean(touched.email && errors.email)}
              sx={{ ...themeTypography.customInput }}
            >
              <InputLabel htmlFor="outlined-adornment-email-login">
                Email Address / Username
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-login"
                type="email"
                value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Email Address / Username"
                inputProps={{}}
              />
              {touched.email && errors.email && (
                <FormHelperText
                  error
                  id="standard-weight-helper-text-email-login"
                >
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl
              fullWidth
              error={Boolean(touched.password && errors.password)}
              sx={{ ...themeTypography.customInput }}
            >
              <InputLabel htmlFor="outlined-adornment-password-login">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-login"
                type={showPassword ? "text" : "password"}
                value={values.password}
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                inputProps={{}}
              />
              {touched.password && errors.password && (
                <FormHelperText
                  error
                  id="standard-weight-helper-text-password-login"
                >
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>
            <Grid item xs={12}>
              <Box
                sx={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />

                <Button
                  variant="outlined"
                  sx={{
                    cursor: "unset",
                    borderColor: `${theme.palette.grey[100]} !important`,
                    color: `${theme.palette.grey[900]}!important`,
                    fontWeight: 500,
                    borderRadius: `${customization.borderRadius}px`,
                  }}
                  disableRipple
                  disabled
                >
                  OR
                </Button>

                <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
              </Box>
            </Grid>
            <Grid
              display={"flex"}
              justifyContent="center"
              alignItems={"center"}
              item
              xs={12}
            >
              {Object.entries(handleSocial)?.map(([key, handler]) => {
                if (
                  typeof handler !== "function" ||
                  !Social[key] ||
                  !Social[key].icon
                )
                  return null;
                return (
                  <AnimateButton>
                    <Button
                      key={key}
                      aria-label={`${key} login button`}
                      onClick={handler}
                      disabled={isLoading}
                    >
                      {React.createElement(Social[key].icon, {
                        htmlColor: Social[key].color,
                      })}
                    </Button>
                  </AnimateButton>
                );
              })}
              {/* <AnimateButton>
            <Button
              disableElevation
              fullWidth
              onClick={googleHandler}
              size="large"
              variant="outlined"
              sx={{
                color: "grey.700",
                backgroundColor: theme.palette.grey[50],
                borderColor: theme.palette.grey[100],
              }}
            >
              <Box sx={{ mr: { xs: 1, sm: 2, width: 20 } }}>
                <Google
                  // src={Google}
                  // alt="google"
                  width={16}
                  height={16}
                  style={{ marginRight: matchDownSM ? 8 : 16 }}
                />
              </Box>
              Sign in with Google
            </Button>
          </AnimateButton> */}
            </Grid>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={1}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    onChange={(event) => setChecked(event.target.checked)}
                    name="checked"
                    color="primary"
                  />
                }
                label="Remember me"
              />
              <Typography
                variant="subtitle1"
                color="secondary"
                sx={{ textDecoration: "none", cursor: "pointer" }}
              >
                Forgot Password?
              </Typography>
            </Stack>
            {errors.submit && (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{ mt: 3 }}
              >
                <FormHelperText error>{errors.submit as string}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 0 }}>
              <AnimateButton>
                <CustomButton
                  disableElevation
                  disabled={isSubmitting}
                  fullWidth
                  size="large"
                  text="Sign in"
                  type="submit"
                />
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default FirebaseLogin;
