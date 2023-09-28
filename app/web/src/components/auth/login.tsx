import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import api from "../../api/_api";

import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { GitHub, Google, LinkedIn } from "@mui/icons-material";
import EmailField from "./Fields/EmailField";
import PasswordField from "./Fields/PasswordField";
import CustomButton from "../button";
import { useNavigate } from "react-router-dom";
import { FormHelperText } from "@mui/material";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  setRegisterPage: React.Dispatch<React.SetStateAction<boolean>>;
}
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
const defaultTheme = createTheme();

function LoginPage({
  setRegisterPage,
  className,
  ...props
}: UserAuthFormProps) {
  let handleSocial = {
    Google: () => {},
    Github: () => {},
    Linkedin: () => {},
  };
  const INITIAL = { text: "", error: "" };

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isVisible, setIsVisible] = React.useState(false);
  const [email, setEmail] = React.useState(INITIAL);
  const [password, setPassword] = React.useState(INITIAL);
  const [error, setError] = React.useState("");

  //const supabase = createClientComponentClient();
  // const supabase = new SupabaseClient();
  const toggleVisibility = () => setIsVisible(!isVisible);
  const router = useNavigate();

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);
    console.log("submit entered");
    api.user
      .login(email.text, password.text, true)
      .then(({ authTokenId, role }) => {
        if (!authTokenId) return;
        localStorage.setItem("auth_token", authTokenId);
        localStorage.setItem("role", role);

        router("/overview"); // Redirect to admin dashboard
      })
      .catch((err) => {
        setError(err?.response?.data);
        setIsLoading(false);
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

  return (
    <>
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography
        // fontFamily={"Nanum Gothic"}
        // component="h1"
        // fontWeight={600}
        variant="h5"
      >
        Sign in
      </Typography>
      <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 1 }}>
        <EmailField {...{ email, setEmail, loading: isLoading }} />

        <PasswordField {...{ password, setPassword, loading: isLoading }} />
        <FormHelperText style={{ color: "red" }}>{error || " "}</FormHelperText>

        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <CustomButton text="Sign in" type="submit" />
        <Typography textAlign={"center"} justifySelf={"center"}>
          Or continue with
        </Typography>

        <Stack direction="row" spacing={2} justifyContent={"center"}>
          {Object.entries(handleSocial)?.map(([key, handler]) => {
            if (
              typeof handler !== "function" ||
              !Social[key] ||
              !Social[key].icon
            )
              return null;
            return (
              <Button
                key={key}
                aria-label={`${key} login button`}
                onClick={handler}
              >
                {React.createElement(Social[key].icon, {
                  htmlColor: Social[key].color,
                })}
              </Button>
            );
          })}
        </Stack>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link onClick={() => setRegisterPage(true)} variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
export default LoginPage;
