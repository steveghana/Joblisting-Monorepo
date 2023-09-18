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
import { IProfession } from "../../types/roles";
import CustomButton from "../button";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  setRegisterPage: React.Dispatch<React.SetStateAction<boolean>>;
}
const defaultTheme = createTheme();

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const INITIAL = { text: "", error: "" };
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isNew, setisNew] = React.useState(true);
  const [isVisible, setIsVisible] = React.useState(false);
  const [role, setRole] = React.useState<IProfession>();
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
        role,
      })
      .then(({ role, token }) => {
        if (!token) return;
        localStorage.setItem("auth_token", token);
        localStorage.setItem("role", role);

        if (role === "Ceo") {
          router("/overview"); // Redirect to admin dashboard
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
  console.log(role);
  if (isNew) {
    return (
      <RoleAuth
        setSelectedValue={setRole}
        selectedValue={role}
        setisNew={() => setisNew(false)}
      />
    );
  }

  return (
    <Box justifyContent={"center"}>
      <Box
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
        sx={{ display: "flex" }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
      </Box>
      <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 1 }}>
        <NameField
          {...{
            name: firstName,
            setName: setFirstName,
            loading: isLoading,
          }}
        />
        <EmailField {...{ email, setEmail, loading: isLoading }} />

        <PasswordField {...{ password, setPassword, loading: isLoading }} />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <CustomButton type="submit" text="Sign in" />

        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link onClick={() => props.setRegisterPage(false)} variant="body2">
              {"Already have an account? Sign In"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
