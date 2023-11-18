import { Typography } from "@mui/material";
import LoadingButton, { LoadingButtonProps } from "@mui/lab/LoadingButton";

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
        boxShadow:
          "rgba(77, 172, 255, 0.55) 0px 13px 27px -5px, rgba(77, 172, 255, 0.5) 0px 8px 16px -8px;",
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
