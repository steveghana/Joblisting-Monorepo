import React, { useState } from "react";
// import { signIn, signOut, useSession } from 'next-auth/react';
// import { Link } from 'react-router-dom';;
import { UserAuthForm } from "../../../components/auth/userAuthForm";
import LoginPage from "../../../components/auth/login";
import { Link } from "react-router-dom";
import {
  Avatar,
  Box,
  Grid,
  Paper,
  Typography,
  createTheme,
  ThemeProvider,
  CssBaseline,
} from "@mui/material";
const defaultTheme = createTheme();

export default function Auth() {
  const [registerPage, setRegisterPage] = useState(false);
  console.log(registerPage);
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage:
                "url(https://source.unsplash.com/random?wallpapers)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {!registerPage ? (
                // <div></div>
                <LoginPage setRegisterPage={setRegisterPage} />
              ) : (
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                  <UserAuthForm setRegisterPage={setRegisterPage} />
                  <p className="registrationLink">
                    Or login&nbsp;
                    <div onClick={() => setRegisterPage(false)}> login</div>
                  </p>
                  <p className="px-8 text-center text-sm text-muted-foreground">
                    By clicking continue, you agree to our{" "}
                    <Link
                      to="/terms"
                      className="underline underline-offset-4 hover:text-primary"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      to="/privacy"
                      className="underline underline-offset-4 hover:text-primary"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </div>
              )}
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
}
