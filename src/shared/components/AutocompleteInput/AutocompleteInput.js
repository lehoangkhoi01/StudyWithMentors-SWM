import { Autocomplete, TextField } from "@mui/material";
import React from "react";
import style from "./AutocompleteInput.module.scss";
import { OPTIONAL } from "../../constants/common";

const AutocompleteInput = (props) => {
  return (
    <div className={`${style.autocomplete__container}`}>
      <label htmlFor={props.inputId}>
        {props.label}
        {!props.required ? <span>({OPTIONAL})</span> : ""}
      </label>
      <Autocomplete
        disablePortal
        id={props.id}
        multiple={props.multiple ?? false}
        options={props.options}
        renderOption={props.renderOption}
        getOptionLabel={props.getOptionLabel}
        onChange={props.onChange}
        value={props.value}
        renderInput={(params) => <TextField {...params} />}
        {...props}
      />
    </div>
  );
};

export default AutocompleteInput;
