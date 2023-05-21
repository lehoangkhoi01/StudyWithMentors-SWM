import { DatePicker } from "@mui/x-date-pickers";
import style from "./CustomizedDatePicker.module.scss";
import { DATE_FORMAT, OPTIONAL } from "../../constants/common";
import { useEffect, useState } from "react";
import { convertISOToFormat } from "../../../Helpers/dateHelper";

const CustomizedDatePicker = (props) => {
  const [value, setValue] = useState("");
  const [isMapped, setIsMapped] = useState(false);
  const dateFormat = props.format ?? DATE_FORMAT.MM_YYYY;

  useEffect(() => {
    if (!isMapped && props.value !== undefined) {
      console.log(props.value);
      setValue(props.value ?? "");
      setIsMapped(true);
    }
  }, [props.value]);

  return (
    <div className={`${style.datePicker__container} ${props.className}`}>
      <label htmlFor={props.inputId}>
        {props.name}
        {!props.required ? <span>({OPTIONAL})</span> : ""}
      </label>
      <DatePicker
        disabled={props.disabled}
        format={dateFormat}
        views={props.views ?? ["year", "month"]}
        className={style.datePicker__input}
        onError={props.error}
        slotProps={{
          textField: {
            helperText: props?.error?.message,
          },
        }}
        onChange={(e) => {
          const datevalue = convertISOToFormat(dateFormat, e);

          setValue(e);
          props.setValue(props.formName, datevalue);

          console.log(props.getValues());
        }}
        value={value}
      ></DatePicker>
    </div>
  );
};

export default CustomizedDatePicker;
