"use client";
import React, { useState } from "react";
// import { useRouter } from "next/navigation";

// import { Input } from '@nextui-org/react';
import { Icons } from "../icons";
// import { Button } from '../../lib/button';
// import { Label } from './label';
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import RoleAuth from "./roleAuthForm";
// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import api from "../../api/_api";
import { useNavigate } from "react-router";
import NameField from "./Fields/NameField";
import EmailField from "./Fields/EmailField";
import PasswordField from "./Fields/PasswordField";
import { GitHub, Google } from "@mui/icons-material";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  setRegisterPage: React.Dispatch<React.SetStateAction<boolean>>;
}
const defaultTheme = createTheme();

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const INITIAL = { text: "", error: "" };
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isNew, setisNew] = React.useState(true);
  const [isVisible, setIsVisible] = React.useState(false);
  const [role, setRole] = React.useState(INITIAL);
  const [firstName, setFirstName] = useState(INITIAL);
  const [lastName, setLastName] = useState(INITIAL);
  const [email, setEmail] = useState(INITIAL);
  const [password, setPassword] = useState(INITIAL);
  const router = useNavigate();
  //  const supabase = createClientComponentClient();
  // const supabase = new SupabaseClient();
  const toggleVisibility = () => setIsVisible(!isVisible);
  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    const {} = email;
    await api.user
      .register({
        email: email.text,
        password: password.text,
        firstName: firstName.text,
        lastName: lastName.text,
        role: role.text,
      })
      .then(({ role, token }) => {
        if (!token) return;
        localStorage.setItem("auth_token", token);
        localStorage.setItem("role", role);

        if (role === "Admin") {
          router("/home"); // Redirect to admin dashboard
        } else if (role === "developer") {
          router("/access-denied"); // Redirect to user dashboard
        }
      })
      .finally(() => setIsLoading(false));
  }

  //  const handleSubmit = React.useCallback(async () => {
  //    if (
  //      ![
  //        checkValid(name, setName, emailValidator),
  //        checkValid(email, setEmail, emailValidator),
  //        checkValid(password, setPassword, passwordValidator),
  //      ].every((v) => v)
  //    )
  //      return;
  //    if (typeof handleSignUp !== "function") handleSignUp = () => {};

  //    setLoading(true);

  //    return handleSignUp({
  //      name: name.text,
  //      email: email.text,
  //      password: password.text,
  //    });
  //  }, []);
  if (isNew && !role.text) {
    return (
      <RoleAuth
        setSelectedValue={setRole}
        selectedValue={role.text}
        setisNew={() => setisNew(false)}
      />
    );
  }

  return (
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
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 1 }}>
              <NameField
                {...{
                  name: firstName,
                  setName: setFirstName,
                  loading: isLoading,
                }}
              />
              <EmailField {...{ email, setEmail, loading: isLoading }} />

              <PasswordField
                {...{ password, setPassword, loading: isLoading }}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>
              <Stack direction="column" spacing={2}>
                <Button
                  type="button"
                  variant="outlined"
                  disabled={isLoading}
                  startIcon={<GitHub />}
                >
                  Github
                </Button>
                <Button
                  type="button"
                  variant="outlined"
                  disabled={isLoading}
                  startIcon={<Google className="mr-2 h-4 w-4" />}
                >
                  Google
                </Button>
              </Stack>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    onClick={() => props.setRegisterPage(false)}
                    variant="body2"
                  >
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
