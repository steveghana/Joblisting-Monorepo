import {
  Button,
  ButtonTypeMap,
  ButtonProps,
  ExtendButtonBase,
  Typography,
} from "@mui/material";
import React from "react";
import { themePalette } from "../../themes/schemes/palette";

interface IButtonProps extends ButtonProps {
  text: string; // Add your custom text property
}

function CustomButton(props: IButtonProps) {
  return (
    <Button
      {...props} // Spread all properties from IButtonProps
      // fullWidth
      variant={props.variant || "contained"}
      sx={{
        mt: 3,
        mb: 2,
        borderRadius: "10px",
        minWidth: "100px",
        // background: "red",
        // background: props.variant === "contained" && themePalette.primary.main,
      }}
    >
      <Typography textTransform={"none"} variant="button">
        {props.text}
      </Typography>
    </Button>
  );
}

export default CustomButton;
