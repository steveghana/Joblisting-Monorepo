import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormHelperText,
  Grid,
  RadioGroup,
  Typography,
} from "@mui/material";
import { IProfession } from "../../types/roles";
import CustomButton from "../button";
import { ArrowForward, ArrowForwardIos } from "@mui/icons-material";
import {
  useGetRolesQuery,
  useUpdateUserMutation,
} from "../../store/services/userAuth.service";
import { useNavigate } from "react-router";
import FullscreenProgress from "../FullscreenProgress/FullscreenProgress";
import AuthFooter from "../AuthFooter";
import LogoSection from "../../layout/MainLayout/LogoSection";
// interface RoleProps {
//   setisNew: () => void;
//   setSelectedValue: React.Dispatch<React.SetStateAction<string>>;
//   role: IProfession;
// }
function RoleAuth() {
  const [error, setError] = useState(false);
  const [role, setRole] = React.useState<IProfession>();
  const navigate = useNavigate();
  const [helperText, setHelperText] = React.useState("");
  const handleRadioChange = (event: any) => {
    setRole(event.target.value);
  };
  const [updateUser, { isError, isLoading }] = useUpdateUserMutation();
  const roles = ["Ceo", "Recruitment"];
  const onMoveToRegister = async () => {
    if (!role) {
      setError(true);
      setHelperText("Please select an option.");
      return;
    }
    try {
      // let token = localStorage.getItem("auth_token");

      const updating = await updateUser({
        role,
      }).unwrap();
      if (updating && !isError) {
        localStorage.setItem("role", role);
        navigate("/dashboard/default");
      }
    } catch (error) {
      console.log("Eror message:", error);
    }
  };
  if (isLoading) {
    return <FullscreenProgress />;
  }
  return (
    <Grid
      sx={{ height: "100dvh" }}
      display={"flex"}
      justifyContent={"center"}
      flexDirection={"column"}
      gap={2}
      alignItems={"center"}
    >
      <Grid>
        <LogoSection />
      </Grid>
      <Box
        display={"flex"}
        flexDirection={"column"}
        gap={1}
        alignItems={"center"}
      >
        <Typography fontFamily={"Didact Gothic"} fontWeight={400} variant="h1">
          {" "}
          Lets sign you up
        </Typography>
        <Typography
          fontFamily={"Lato"}
          fontWeight={400}
          variant="caption"
          color={"GrayText"}
        >
          Create a free account now and lets get started
        </Typography>
        <div>Select an Account Type</div>
      </Box>
      <FormControl
        sx={{ minWidth: "75%" }}
        margin="dense"
        error={error}
        variant="standard"
      >
        <RadioGroup>
          {roles.map((r, i) => (
            <FormControlLabel
              key={r}
              control={<Radio />}
              label={r}
              sx={{
                my: 1,
                ml: 1.5,
                borderRadius: "5px",
                border: role === "Ceo" ? "1px solid blue" : "1px solid gray",
              }}
              value={r}
              checked={role === r}
              onChange={handleRadioChange}
            />
          ))}
          <FormHelperText>{helperText}</FormHelperText>
        </RadioGroup>
        <CustomButton
          text="continue"
          disabled={isLoading}
          endIcon={<ArrowForward />}
          loadingPosition="end"
          loading={isLoading}
          onClick={onMoveToRegister}
        />
      </FormControl>
      <Grid>
        <AuthFooter />
      </Grid>
    </Grid>
  );
}

export default RoleAuth;
