'use client'
import React, { useState } from 'react';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import { Button } from '@nextui-org/react';
interface RoleProps {
    setisNew : ()=> void
}
function RoleAuth(props:RoleProps) {
  const [selectedValue, setSelectedValue] = useState('');

  const handleRadioChange = (event:any) => {
    setSelectedValue(event.target.value);
  };

  return (
    <FormGroup>
      <FormControlLabel
        control={<Radio />}
        label="Option 1"
        value="option1"
        checked={selectedValue === 'option1'}
        onChange={handleRadioChange}
      />
      <FormControlLabel
        control={<Radio />}
        label="Option 2"
        value="option2"
        checked={selectedValue === 'option2'}
        onChange={handleRadioChange}
      />
      <FormControlLabel
        control={<Radio />}
        label="Option 3"
        value="option3"
        checked={selectedValue === 'option3'}
        onChange={handleRadioChange}
      />
      <Button onClick={()=>props.setisNew()}>continue</Button>
    </FormGroup>
  );
}

export default RoleAuth;
