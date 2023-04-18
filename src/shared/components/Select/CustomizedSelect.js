import { OPTIONAL } from "../../constants/common";
import { Checkbox, ListItemText } from "@mui/material";
import style from "./CustomizedSelect.module.scss";

import { MenuItem, Select } from "@mui/material";

const CustomizedSelect = (props) => {
  return (
    <div className={`${style.select__container} ${props.className}`}>
      {props.isMultipleSelect ? (
        <>
          <label htmlFor={props.inputId}>{`${props.name ?? ""} 
      ${!props.required ? `(${OPTIONAL})` : ""}`}</label>
          <Select
            multiple
            className={style.select__input}
            id={props.inputId}
            placeholder={props.placeholder}
            {...props}
          >
            {props.items.map((item, index) => (
              <MenuItem key={`SELECT_ITEM_${index}`} value={item}>
                <Checkbox checked={props.value.indexOf(item) > -1} />
                <ListItemText primary={item} />
              </MenuItem>
            ))}
          </Select>
        </>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default CustomizedSelect;
