import { Link } from "react-router-dom";
import React from "react";
// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Avatar,
  Divider,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";

// project imports
import AuthWrapper1 from "../AuthWrapper1";
import AuthCardWrapper from "../AuthCardWrapper";
import AuthLogin from "../auth-forms/AuthLogin";
import Logo from "../../../../ui-component/Logo";
import AuthFooter from "../../../../ui-component/cards/AuthFooter";
import AuthWrapper2 from "../Authwrapper2";

// assets

// ================================|| AUTH3 - LOGIN ||================================ //

const Login = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <AuthWrapper2>
      <>
        <Grid /* item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }} */>
          <AuthCardWrapper>
            <Grid
              display="flex"
              alignItems="center"
              justifyContent="center"
              mb={2}
            >
              <Link to="#">
                <Logo />
              </Link>
            </Grid>
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="center"
            >
              <Grid>
                <Grid
                  container
                  direction={matchDownSM ? "column-reverse" : "row"}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Grid item>
                    <Stack
                      alignItems="center"
                      justifyContent="center"
                      // spacing={1}
                    >
                      <Typography
                        color={theme.palette.primary.main}
                        gutterBottom
                        variant={matchDownSM ? "h3" : "h2"}
                      >
                        Hi, Welcome Back
                      </Typography>
                      <Typography
                        variant="caption"
                        fontSize="16px"
                        textAlign={matchDownSM ? "center" : "inherit"}
                      >
                        Enter your credentials to continue
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <AuthLogin />
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <Grid
                  item
                  container
                  direction="column"
                  alignItems="center"
                  xs={12}
                >
                  <Typography
                    component={Link}
                    to="/management/profile/settings"
                    variant="subtitle1"
                    sx={{ textDecoration: "none" }}
                  >
                    Don&apos;t have an account?
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </AuthCardWrapper>
        </Grid>

        <Grid xs={12}>
          <AuthFooter />
        </Grid>
      </>
    </AuthWrapper2>
  );
};

export default Login;
