import * as React from "react";
import {
  Button,
  FormControl,
  TextField,
  InputAdornment,
  FormHelperText,
} from "@mui/material";

import { EmailOutlined } from "@mui/icons-material";
export interface EmailFieldProps {
  email: { text: string; error: string };
  setEmail: (props: { text: string; error: string }) => void;
  textFieldVariant?: "outlined" | "filled" | "standard";
  loading: boolean;
}

const EmailField: React.FC<EmailFieldProps> = ({
  email,
  setEmail,
  textFieldVariant = "filled",
  loading,
}) => {
  return (
    <FormControl margin="none" fullWidth error={Boolean(email.error)}>
      <TextField
        placeholder={textFieldVariant === "outlined" ? "Email" : ""}
        label={textFieldVariant !== "outlined" && "Email"}
        value={email.text}
        error={Boolean(email.error)}
        // variant={textFieldVariant}
        disabled={loading}
        onChange={(e) => {
          setEmail({ text: e.target.value, error: "" });
        }}
        type={"email"}
        InputProps={{
          startAdornment: textFieldVariant === "outlined" && (
            <InputAdornment position="start">
              <EmailOutlined color={email.error ? "error" : "action"} />
            </InputAdornment>
          ),
        }}
      />
      <FormHelperText>{email.error || " "}</FormHelperText>
    </FormControl>
  );
};
export default React.memo(EmailField);
