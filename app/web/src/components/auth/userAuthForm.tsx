import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import RoleAuth from "./roleAuthForm";
import api from "../../api/_api";
import { useNavigate } from "react-router";
import NameField from "./Fields/NameField";
import EmailField from "./Fields/EmailField";
import PasswordField from "./Fields/PasswordField";
import { IProfession } from "../../types/roles";
import CustomButton from "../button";
import checkValid from "../../lib/checkvalid";
interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  setRegisterPage: React.Dispatch<React.SetStateAction<boolean>>;
}

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
    // const {} = email;
    console.log("submitting");
    //  const handleSubmit = React.useCallback(async () => {
    // if (
    //   ![
    //     checkValid(firstName, setFirstName),
    //     checkValid(lastName, setLastName),
    //     checkValid(email, setEmail),
    //     checkValid(password, setPassword),
    //   ].every((v) => v)
    // ) {
    //   return;
    // }
    await api.user
      .register({
        email: email.text,
        password: password.text,
        firstName: firstName.text,
        lastName: lastName.text,
        role,
      })
      .then((data) => {
        console.log(data);
        // if (!token) return;
        // localStorage.setItem("auth_token", token);
        // localStorage.setItem("role", role);

        // router("/overview"); // Redirect to admin dashboard
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      })
      .finally(() => setIsLoading(false));
  }

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
