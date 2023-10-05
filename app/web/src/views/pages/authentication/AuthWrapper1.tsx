// material-ui
import { styled } from "@mui/material/styles";
import { themePalette } from "../../../themes/schemes/palette";

// ==============================|| AUTHENTICATION 1 WRAPPER ||============================== //

const AuthWrapper1 = styled("div")(({ theme }) => ({
  backgroundColor: themePalette.primary.light,
  minHeight: "100vh",
}));

export default AuthWrapper1;
