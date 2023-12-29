import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
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
} from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AnimateButton from '../../extended/AnimateButton';
import { themeTypography } from '../../../themes/schemes/typography';
import CustomButton from '../../button';

import { useLoginUserMutation, useLoginUserWithGoogleMutation } from '../../../store/services/userAuth.service';
import { useNavigate } from 'react-router';
import { TokenResponse, useGoogleLogin } from '@react-oauth/google';
import { toast } from 'react-toastify';
import { Social } from './authicons';

export let handleSocial = {
  Github: () => {},
  Linkedin: () => {},
};
// ============================|| AUTH - LOGIN ||============================ //

const AuthLogin = () => {
  const theme = useTheme();

  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const customization = useSelector((state: any) => state.customization);
  const router = useNavigate();
  const [googleloading, setgoogleloading] = useState(true);

  const [checked, setChecked] = useState(true);
  const [loginUser, { isLoading, isError, error }] = useLoginUserMutation();
  const [loginWithGoogle, { isLoading: isWithGoogleLoading, isError: isWithGoogleErr }] =
    useLoginUserWithGoogleMutation();
  async function login(values: { email: any; password: any; submit?: null }) {
    // const s = await api.user.login(values.email, values.password, false);
    const data = await loginUser({
      password: values.password,

      email: values.email,
      rememberMe: false,
    }).unwrap();
    if (!data) return;
    const { authTokenId, role } = data;
    if (!authTokenId) return;
    sessionStorage.setItem('auth_token', authTokenId);
    sessionStorage.setItem('role', role);

    router('/dashboard/default');
    toast.success(`Welcome back`, { position: 'top-center' });

    return true;
  }

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const onGoogleSucess = async (codeResponse: Omit<TokenResponse, 'error' | 'error_description' | 'error_uri'>) => {
    try {
      const response = await loginWithGoogle({
        accessToken: codeResponse.access_token,
      }).unwrap();

      if (response) {
        const { authTokenId, role } = response;
        if (!authTokenId) return;
        sessionStorage.setItem('auth_token', authTokenId);
        sessionStorage.setItem('role', role);
        router('/dashboard/default');
        toast.success(`Welcome back`, { position: 'top-center' });
      }
    } catch (error) {
      toast.error('Couldnt login user, please try again later', {
        position: 'bottom-center',
      });
    }
  };
  const loginAuth = useGoogleLogin({
    onSuccess: (codeResponse) => onGoogleSucess(codeResponse),
    onError: (error) => console.log('Login Failed:', error),
  });

  const handleMouseDownPassword = (event: { preventDefault: () => void }) => {
    event.preventDefault();
  };

  return (
    <>
      <Formik
        initialValues={{
          email: 'steve@svtech.com',
          password: '123456',
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string().max(255).required('Password is required'),
        })}
        onSubmit={async (values, setters) => {
          await login(values);
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <FormControl
              fullWidth
              error={Boolean(touched.email && errors.email)}
              sx={{ ...themeTypography.customInput }}
            >
              <InputLabel htmlFor="outlined-adornment-email-login">Email Address / Username</InputLabel>
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
                <FormHelperText error id="standard-weight-helper-text-email-login">
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl
              fullWidth
              error={Boolean(touched.password && errors.password)}
              sx={{ ...themeTypography.customInput }}
            >
              <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-login"
                type={showPassword ? 'text' : 'password'}
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
                <FormHelperText error id="standard-weight-helper-text-password-login">
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>
            <Grid item xs={12}>
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                }}
              >
                <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />

                <Button
                  variant="outlined"
                  sx={{
                    cursor: 'unset',
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

            <Grid display={'flex'} justifyContent="center" alignItems={'center'} item xs={12}>
              <AnimateButton>
                <Button
                  aria-label={`login button`}
                  disabled={isWithGoogleLoading}
                  onClick={() => loginAuth()}
                  // disabled={renderProps.disabled}
                >
                  {React.createElement(Social['Google'].icon)}
                </Button>
              </AnimateButton>
              <>
                {Object.entries(handleSocial)?.map(([key, handler], i) => {
                  if (typeof handler !== 'function' || !Social[key] || !Social[key].icon) return null;
                  return (
                    <AnimateButton key={i}>
                      <Button key={key} aria-label={`${key} login button`} onClick={handler} disabled={isLoading}>
                        {React.createElement(Social[key].icon)}
                      </Button>
                    </AnimateButton>
                  );
                })}
              </>
            </Grid>
            <Stack mt={1} direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
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
              <Typography variant="subtitle1" color="secondary" sx={{ textDecoration: 'none', cursor: 'pointer' }}>
                Forgot Password?
              </Typography>
            </Stack>
            {isError && (
              <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 3 }}>
                <FormHelperText error>{error as string}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <CustomButton
                  sx={{ m: 0 }}
                  disableElevation
                  disabled={isSubmitting || isLoading || isWithGoogleLoading}
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

export default AuthLogin;
