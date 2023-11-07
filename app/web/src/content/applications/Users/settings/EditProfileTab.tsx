import {
  Grid,
  Typography,
  CardContent,
  Card,
  Box,
  Divider,
  Button,
  TextField,
  FormHelperText,
  FormControl,
  InputLabel,
  OutlinedInput,
  Select,
  MenuItem,
} from "@mui/material";
import { gridSpacing } from "../../../../store/constant";
import MuiTypography from "@mui/material/Typography";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DoneTwoToneIcon from "@mui/icons-material/DoneTwoTone";
import Text from "../../../../components/Text";
import Label from "../../../../components/Label";
import SubCard from "../../../../components/SubCard";
import { Formik } from "formik";
import { themeTypography } from "../../../../themes/schemes/typography";
import AnimateButton from "../../../../components/extended/AnimateButton";
import CustomButton from "../../../../components/button";
import MainCard from "../../../../components/MainCard";
import MyProfile from "./MyProfile";
import { userdata as user } from "./userdata";
import { styled } from "@mui/material/styles";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
const Input = styled("input")({
  display: "none",
});

const AvatarWrapper = styled(Card)(
  ({ theme }) => `

    position: relative;
    overflow: visible;
    display: inline-block;
    margin-top: -${theme.spacing(9)};
    margin-left: ${theme.spacing(2)};

    .MuiAvatar-root {
      width: ${theme.spacing(16)};
      height: ${theme.spacing(16)};
    }
`
);

const ButtonUploadWrapper = styled(Box)(
  ({ theme }) => `
    position: absolute;
    width: ${theme.spacing(4)};
    height: ${theme.spacing(4)};
    bottom: -${theme.spacing(1)};
    right: -${theme.spacing(1)};

    .MuiIconButton-root {
      border-radius: 100%;
      background: ${theme.colors?.primary.main};
      color: ${theme.palette.primary.contrastText};
      box-shadow: ${theme.colors?.shadows.primary};
      width: ${theme.spacing(4)};
      height: ${theme.spacing(4)};
      padding: 0;
  
      &:hover {
        background: ${theme.colors?.primary.dark};
      }
    }
`
);

const CardCover = styled(Card)(
  ({ theme }) => `
    position: relative;

    .MuiCardMedia-root {
      height: ${theme.spacing(26)};
    }
`
);

const CardCoverAction = styled(Box)(
  ({ theme }) => `
    position: absolute;
    right: ${theme.spacing(2)};
    bottom: ${theme.spacing(2)};
`
);

function EditProfileTab({ ...others }) {
  // const []
  return (
    <Grid container spacing={1}>
      {/* <Grid item xs={12}> */}
      <CssVarsProvider disableTransitionOnChange>
        <CssBaseline />
        {/* <Box sx={{ display: "flex", minHeight: "100dvh" }}>
          <Box
            component="main"
            className="MainContent"
            sx={{
              pt: {
                xs: "calc(12px + var(--Header-height))",
                md: 3,
              },
              pb: {
                xs: 2,
                sm: 2,
                md: 3,
              },
              flex: 1,
              display: "flex",
              flexDirection: "column",
              minWidth: 0,
              height: "100dvh",
              gap: 1,
              overflow: "auto",
            }}
          > */}
        {/* </Box> */}
        {/* </Box> */}
        <MyProfile user={user} />
      </CssVarsProvider>
      {/* </Grid> */}
    </Grid>
  );
}

export default EditProfileTab;
