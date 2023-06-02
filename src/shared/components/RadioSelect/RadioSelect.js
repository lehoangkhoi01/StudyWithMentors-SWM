import React from "react";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import style from "./RadioSelect.module.scss";

const RadioSelect = (props) => {
  return (
    <FormControl fullWidth className={`${style.radioSelect__container}`}>
      <FormLabel
        id="demo-radio-buttons-group-label"
        className={`${style.radioSelect__label}`}
      >
        {props.title}
      </FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
        {...props.field}
      >
        <FormControlLabel value="Yes" control={<Radio />} label="Có" />
        <FormControlLabel value="No" control={<Radio />} label="Không" />
      </RadioGroup>
    </FormControl>
  );
};

export default RadioSelect;
