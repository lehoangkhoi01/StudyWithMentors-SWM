import React from "react";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

const RadioSelect = (props) => {
  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">{props.title}</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
      >
        <FormControlLabel value="Yes" control={<Radio />} label="Có" />
        <FormControlLabel value="No" control={<Radio />} label="Không" />
      </RadioGroup>
    </FormControl>
  );
};

export default RadioSelect;
