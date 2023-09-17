import * as React from "react";
import {
  Button,
  FormControl,
  TextField,
  InputAdornment,
  FormHelperText,
} from "@mui/material";
import HiddenPasswordIcon from "@mui/icons-material/VisibilityOff";
import ShownPasswordIcon from "@mui/icons-material/Visibility";
import LockIcon from "@mui/icons-material/LockOpen";

export interface PasswordFieldProps {
  password: { text: string; error: string };
  setPassword: (props: { text: string; error: string }) => void;
  textFieldVariant?: "outlined" | "filled" | "standard";
  loading: boolean;
}

const PasswordField: React.FC<PasswordFieldProps> = ({
  password,
  setPassword,
  textFieldVariant = "filled",
  loading,
}) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const tooglePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <FormControl margin="none" fullWidth error={Boolean(password.error)}>
      <TextField
        placeholder={textFieldVariant === "outlined" ? "Password" : ""}
        label={textFieldVariant !== "outlined" && "Password"}
        error={Boolean(password.error)}
        // variant={textFieldVariant}
        value={password.text}
        disabled={loading}
        onChange={(e) => {
          setPassword({ text: e.target.value, error: "" });
        }}
        type={!showPassword ? "password" : "text"}
        InputProps={{
          startAdornment: textFieldVariant === "outlined" && (
            <InputAdornment position="start">
              <LockIcon color={password.error ? "error" : "action"} />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <Button aria-label="toggle password" onClick={tooglePassword}>
                {React.createElement(
                  !showPassword ? ShownPasswordIcon : HiddenPasswordIcon,
                  {
                    color: password.error ? "error" : "action",
                  }
                )}
              </Button>
            </InputAdornment>
          ),
        }}
      />
      <FormHelperText>{password.error || " "}</FormHelperText>
    </FormControl>
  );
};
export default React.memo(PasswordField);
