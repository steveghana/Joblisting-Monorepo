import { Link } from "react-router-dom";
import React from "react";
// material-ui
import { useTheme } from "@mui/material/styles";
import { Divider, Grid, Stack, Typography, useMediaQuery } from "@mui/material";

// project imports
import AuthCardWrapper from "../AuthCardWrapper";
import Logo from "../../Logo";
import AuthRegister from "../auth-forms/AuthRegister";
import AuthFooter from "../../AuthFooter";
import AuthWrapper2 from "../Authwrapper";
import LogoSection from "../../../layout/MainLayout/LogoSection";

// assets

// ===============================|| AUTH3 - REGISTER ||=============================== //

const Register = () => {
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
                <LogoSection />
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
                <AuthRegister />
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
                    to="/auth/login"
                    variant="subtitle1"
                    sx={{ textDecoration: "none" }}
                  >
                    Already have an account?
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </AuthCardWrapper>
        </Grid>

        <Grid xs={12} item>
          <AuthFooter />
        </Grid>
      </>
    </AuthWrapper2>
  );
};

export default Register;
