import {
  Button,
  ButtonTypeMap,
  ButtonProps,
  ExtendButtonBase,
  Typography,
} from "@mui/material";
import LoadingButton, { LoadingButtonProps } from "@mui/lab/LoadingButton";
import React from "react";
import { themePalette } from "../../themes/schemes/palette";
import { Box } from "@mui/system";
import { Send } from "@mui/icons-material";

interface IButtonProps extends LoadingButtonProps {
  text: string; // Add your custom text property
}

function CustomButton(props: IButtonProps) {
  return (
    <LoadingButton
      {...props} // Spread all properties from IButtonProps
      // fullWidth
      loadingPosition="end"
      variant={props.variant || "contained"}
      sx={{
        mt: 3,
        mb: 2,

        boxShadow: "4px 4px 6px rgba(77, 172, 255, 0.5)",
        borderRadius: "40px",
        minWidth: "100px",
        // background: "red",
        // background: props.variant === "contained" && themePalette.primary.main,
      }}
    >
      <Typography textTransform={"none"} variant="button">
        {props.text}
      </Typography>
    </LoadingButton>
  );
}

export default CustomButton;
