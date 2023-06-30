import { OPTIONAL } from "../../constants/common";
import { Checkbox, ListItemText } from "@mui/material";
import style from "./CustomizedSelect.module.scss";

import { MenuItem, Select } from "@mui/material";

const CustomizedSelect = ({ isMultipleSelect, inputId, ...props }) => {
  return (
    <div className={`${style.select__container} ${props.className}`}>
      {isMultipleSelect ? (
        <>
          <label htmlFor={props.inputId}>{`${props.name ?? ""} 
      ${!props.required ? `(${OPTIONAL})` : ""}`}</label>
          <Select
            multiple
            className={style.select__input}
            id={inputId}
            {...props}
          >
            {props.items.map((item, index) => {
              return (
                <MenuItem key={`SELECT_ITEM_${index}`} value={item}>
                  <Checkbox checked={props.value.indexOf(item) > -1} />
                  <ListItemText primary={item.name} />
                </MenuItem>
              );
            })}
          </Select>
        </>
      ) : (
        <>
          <label htmlFor={inputId}>{`${props.name ?? ""} 
      ${!props.required ? `(${OPTIONAL})` : ""}`}</label>
          <Select
            className={style.select__input}
            id={inputId}
            required={props.required}
            type={props.type ?? "text"}
            value={props.value}
            {...props}
          >
            {props.items.map((item, index) => {
              return (
                <MenuItem key={`SELECT_ITEM_${index}`} value={item}>
                  {item.name}
                </MenuItem>
              );
            })}
          </Select>
        </>
      )}
    </div>
  );
};

export default CustomizedSelect;
