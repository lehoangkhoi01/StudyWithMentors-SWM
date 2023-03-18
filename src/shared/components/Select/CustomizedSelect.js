import { OPTIONAL } from "../../constants";
import style from "./CustomizedSelect.module.scss";

import { MenuItem, Select } from "@mui/material";

const CustomizedSelect = (props) => {
  return (
    <div className={`${style.select__container} ${props.className}`}>
      <label htmlFor={props.inputId}>{`${props.name} 
      ${!props.required ? `(${OPTIONAL})` : ""}`}</label>
      <Select
        className={style.select__input}
        id={props.inputId}
        placeholder={props.placeholder}
        required={props.required}
        type={props.type ?? "text"}
        defaultValue={props.items ? props.items[0] : ""}
        {...props.options}
      >
        {props.items.map((item, index) => (
          <MenuItem key={`SELECT_ITEM_${index}`} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default CustomizedSelect;
