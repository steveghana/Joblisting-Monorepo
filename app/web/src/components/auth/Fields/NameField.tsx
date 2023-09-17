import * as React from "react";
import {
  Button,
  FormControl,
  TextField,
  InputAdornment,
  FormHelperText,
} from "@mui/material";
import { AccountBoxOutlined } from "@mui/icons-material";

export interface NameFieldProps {
  name: { text: string; error: string };
  setName: (props: { text: string; error: string }) => void;
  textFieldVariant?: "outlined" | "filled" | "standard";
  loading: boolean;
}

const NameField: React.FC<NameFieldProps> = ({
  name,
  setName,
  textFieldVariant = "filled",
  loading,
}) => {
  return (
    <FormControl margin="none" fullWidth error={Boolean(name?.error)}>
      <TextField
        placeholder={textFieldVariant === "outlined" ? "Name" : ""}
        value={name?.text}
        label={textFieldVariant !== "outlined" && "Name"}
        error={Boolean(name.error)}
        disabled={loading}
        onChange={(e) => {
          setName({ text: e.target.value, error: "" });
        }}
        type={"name"}
        InputProps={{
          startAdornment: textFieldVariant === "outlined" && (
            <InputAdornment position="start">
              <AccountBoxOutlined color={name?.error ? "error" : "action"} />
            </InputAdornment>
          ),
        }}
      />
      <FormHelperText>{name?.error || " "}</FormHelperText>
    </FormControl>
  );
};
export default React.memo(NameField);
