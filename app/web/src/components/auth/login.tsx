import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
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
import { GitHub, Google, Visibility, VisibilityOff } from "@mui/icons-material";
import EmailField from "./Fields/EmailField";
import PasswordField from "./Fields/PasswordField";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  setRegisterPage: React.Dispatch<React.SetStateAction<boolean>>;
}
const defaultTheme = createTheme();

function LoginPage({
  setRegisterPage,
  className,
  ...props
}: UserAuthFormProps) {
  const INITIAL = { text: "", error: "" };

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isVisible, setIsVisible] = React.useState(false);
  const [email, setEmail] = React.useState(INITIAL);
  const [password, setPassword] = React.useState(INITIAL);
  //const supabase = createClientComponentClient();
  // const supabase = new SupabaseClient();
  const toggleVisibility = () => setIsVisible(!isVisible);

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);
    console.log("Email:", email);
    console.log("Password:", password);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
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
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 1 }}>
        <EmailField {...{ email, setEmail, loading: isLoading }} />

        <PasswordField {...{ password, setPassword, loading: isLoading }} />
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
