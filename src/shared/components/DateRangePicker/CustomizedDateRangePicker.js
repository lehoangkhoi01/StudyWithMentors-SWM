import style from "./CustomizedDateRangePicker.module.scss";
import { DateRangePicker, LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const CustomizedDateRangePicker = (props) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateRangePicker
        className={style.dateRange}
        value={props.value}
        localeText={{ start: "Ngày bắt đầu", end: "Ngày kết thúc" }}
        onChange={(newValue) => props.setValue(newValue)}
      />
    </LocalizationProvider>
  );
};

export default CustomizedDateRangePicker;
