import style from "./CustomizedCheckBox.module.scss";

import { Checkbox, FormControlLabel } from "@mui/material";

const CustomizedCheckBox = (props) => {
  return (
    <div className={`${style.checkBox__container} ${props.className}`}>
      <FormControlLabel
        control={<Checkbox checked={props.value ? true : false} />}
        label={props.name}
        {...props.options}
      />
    </div>
  );
};

export default CustomizedCheckBox;
