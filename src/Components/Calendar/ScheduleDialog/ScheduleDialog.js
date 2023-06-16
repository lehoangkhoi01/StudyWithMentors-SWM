import React from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  FormControl,
  Typography,
} from "@mui/material";
import CustomizedDatePicker from "../../../shared/components/DatePicker/CustomizedDatePicker";
import CustomizedTimePicker from "../../../shared/components/TimePicker/CustomizedTimePicker";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import CustomizedSelect from "../../../shared/components/Select/CustomizedSelect";
import { DATE_FORMAT } from "../../../shared/constants/common";

const loopOptions = [
  { name: "Không lặp lại", value: "noloop" },
  { name: "Hằng ngày", value: "daily" },
  { name: "Hằng tuần", value: "weekly" },
];
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const ScheduleDialog = (props) => {
  const {
    register,
    setValue,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    const dateExtracted = data.freeTime.split("/");
    const newFromDate = new Date(
      dateExtracted[2],
      Number.parseInt(dateExtracted[1]) - 1,
      dateExtracted[0],
      data.fromTime.split(":")[0],
      data.fromTime.split(":")[1]
    );
    const newEndDate = new Date(
      dateExtracted[2],
      Number.parseInt(dateExtracted[1]) - 1,
      dateExtracted[0],
      data.toTime.split(":")[0],
      data.toTime.split(":")[1]
    );

    const newEvent = {
      id: 20,
      title: "Free schedule",
      start: newFromDate,
      end: newEndDate,
    };
    props.handleSubmitCreateSchedule(newEvent);
    props.handleClose();
  };

  return (
    <div>
      <Dialog fullWidth open={props.open}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>
            <Typography variant="h5">Lịch nhận cố vấn</Typography>
          </DialogTitle>
          <DialogContent>
            <CustomizedDatePicker
              name="Thời gian"
              placeholder="Thời gian"
              formName="freeTime"
              views={["year", "month", "day"]}
              format={DATE_FORMAT.DD_MM_YYYY}
              value={props.selectedEvent?.start ?? new Date()}
              setValue={setValue}
              getValues={getValues}
              error={errors.freeTime ? true : false}
              required={true}
            />
            <Grid2 container spacing={2}>
              <Grid2 xs={6}>
                <CustomizedTimePicker
                  name="Từ"
                  placeholder="From"
                  formName="From"
                  required={true}
                  options={{ ...register("fromTime") }}
                  error={errors.fromTime ? true : false}
                  defaultValue={props.selectedEvent?.start ?? new Date()}
                />
              </Grid2>
              <Grid2 xs={6}>
                <CustomizedTimePicker
                  name="Đến"
                  placeholder="To"
                  formName="To"
                  required={true}
                  options={{ ...register("toTime") }}
                  error={errors.toTime ? true : false}
                  defaultValue={
                    props.selectedEvent?.end ??
                    new Date(new Date().setHours(new Date().getHours() + 1))
                  }
                />
              </Grid2>
            </Grid2>
            <FormControl style={{ width: "100%" }}>
              <CustomizedSelect
                inputId="loopOption"
                isMultipleSelect={false}
                items={loopOptions}
                required={true}
                name="Lặp lại"
                MenuProps={MenuProps}
              />
            </FormControl>
          </DialogContent>

          <DialogActions>
            <Button variant="outlined" autoFocus onClick={props.handleClose}>
              Hủy Lưu
            </Button>
            <Button variant="contained" type="submit">
              Lưu lịch
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default ScheduleDialog;
