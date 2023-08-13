import { Autocomplete, TextField, Typography } from "@mui/material";
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
        {...props.field}
        // disablePortal
        disabled={props.disabled ?? false}
        id={props.id}
        multiple={props.multiple ?? false}
        options={props.options}
        renderOption={props.renderOption}
        getOptionLabel={props.getOptionLabel}
        onChange={(event, newValue) => {
          props.setSelectedValues(newValue);
          props.field.onChange(newValue);
        }}
        value={props.selectedValues.map((selectedId) => {
          return props.options.find((option) => option.id === selectedId.id);
        })}
        renderInput={(params) => <TextField {...params} />}
      />
      {props.error && (
        <Typography
          className={`${style.autocomplete__errorText}`}
          variant="caption"
          textAlign="left"
          ml={2}
        >
          {props.error?.message}
        </Typography>
      )}
    </div>
  );
};

export default AutocompleteInput;
