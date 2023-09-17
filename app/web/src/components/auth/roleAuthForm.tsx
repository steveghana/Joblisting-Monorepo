import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import { Button, Checkbox } from "@mui/material";
interface RoleProps {
  setisNew: () => void;
  setSelectedValue: React.Dispatch<
    React.SetStateAction<Record<string, string>>
  >;
  selectedValue: string;
}

function RoleAuth(props: RoleProps) {
  const handleRadioChange = (event: any) => {
    props.setSelectedValue(event.target.value);
  };

  return (
    <FormGroup>
      <Checkbox
        checked={false}
        // defaultSelected
        className="bg-success text-white"
        color="success"
      />

      <div>Select an Account Type</div>
      <FormControlLabel
        control={<Radio />}
        label="Ceo"
        sx={{ my: 1 }}
        value="Ceo"
        checked={props.selectedValue === "Ceo"}
        onChange={handleRadioChange}
        className={`border ${
          props.selectedValue === "Ceo" ? "border-blue-800" : ""
        } p-2 rounded`}
      />
      <FormControlLabel
        control={<Radio />}
        label="Marketing"
        value="Marketing"
        sx={{ my: 1 }}
        checked={props.selectedValue === "Marketing"}
        onChange={handleRadioChange}
        className={`border ${
          props.selectedValue === "Marketing" ? "border-blue-800" : ""
        } p-2 rounded`}
      />
      <FormControlLabel
        control={<Radio />}
        label="Recruitment"
        value="Recruitment"
        sx={{ my: 1 }}
        checked={props.selectedValue === "Recruitment"}
        onChange={handleRadioChange}
        className={`border ${
          props.selectedValue === "Recruitment" ? "border-blue-800" : ""
        } p-2 rounded`}
      />

      <FormControlLabel
        control={<Radio />}
        label="Developer"
        value="Developer"
        sx={{ my: 1 }}
        checked={props.selectedValue === "Developer"}
        onChange={handleRadioChange}
        className={`border ${
          props.selectedValue === "Developer" ? "border-blue-800" : ""
        } p-2 rounded`}
      />
      <Button
        // variant="bordered"
        color="primary"
        onClick={() => props.setisNew()}
      >
        continue
      </Button>
    </FormGroup>
  );
}

export default RoleAuth;
