import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import {
  Button,
  Checkbox,
  FormControl,
  FormHelperText,
  RadioGroup,
  Typography,
} from "@mui/material";
import { IProfession } from "../../types/roles";
import CustomButton from "../button";
interface RoleProps {
  setisNew: () => void;
  setSelectedValue: React.Dispatch<React.SetStateAction<string>>;
  selectedValue: IProfession;
}

function RoleAuth(props: RoleProps) {
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = React.useState("");
  const handleRadioChange = (event: any) => {
    props.setSelectedValue(event.target.value);
  };
  const onMoveToRegister = () => {
    if (!props.selectedValue) {
      setError(true);
      setHelperText("Please select an option.");
      return;
    }
    props.setisNew();
  };

  return (
    <FormControl sx={{ m: 3 }} error={error} variant="standard">
      <Typography fontWeight={600} variant="h3">
        {" "}
        Lets sign you up
      </Typography>
      <Typography fontWeight={500} variant="caption" color={"GrayText"}>
        Discover the future of remote jobs in africa. Create a free account now
        and lets get started
      </Typography>
      <div>Select an Account Type</div>
      <RadioGroup>
        <FormControlLabel
          control={<Radio />}
          label="Ceo"
          sx={{
            my: 1,
            borderRadius: "5px",
            border:
              props.selectedValue === "Ceo"
                ? "1px solid blue"
                : "1px solid gray",
          }}
          value="Ceo"
          checked={props.selectedValue === "Ceo"}
          onChange={handleRadioChange}
        />
        <FormControlLabel
          control={<Radio />}
          label="Marketing"
          value="Marketing"
          sx={{
            my: 1,
            borderRadius: "5px",
            border:
              props.selectedValue === "Marketing"
                ? "1px solid blue"
                : "1px solid gray",
          }}
          checked={props.selectedValue === "Marketing"}
          onChange={handleRadioChange}
        />
        <FormControlLabel
          control={<Radio />}
          label="Recruitment"
          value="Recruitment"
          sx={{
            my: 1,
            borderRadius: "5px",
            border:
              props.selectedValue === "Recruitment"
                ? "1px solid blue"
                : "1px solid gray",
          }}
          checked={props.selectedValue === "Recruitment"}
          onChange={handleRadioChange}
        />

        <FormControlLabel
          control={<Radio />}
          label="Developer"
          value="Developer"
          sx={{
            my: 1,
            borderRadius: "5px",
            border:
              props.selectedValue === "Developer"
                ? "1px solid blue"
                : "1px solid gray",
          }}
          checked={props.selectedValue === "Developer"}
          onChange={handleRadioChange}
        />
        <FormHelperText>{helperText}</FormHelperText>
        <CustomButton text="continue" onClick={onMoveToRegister} />
      </RadioGroup>
    </FormControl>
  );
}

export default RoleAuth;
