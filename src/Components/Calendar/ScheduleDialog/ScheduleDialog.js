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
import { format } from "date-fns";
import ConfirmationDialog from "../../../shared/components/ConfirmationDialog/ConfirmationDialog";
import { useRef } from "react";

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
    setValue,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const formRef = useRef();
  const [startTime, setStartTime] = React.useState(new Date());
  const [endTime, setEndTime] = React.useState(
    new Date(new Date().setHours(startTime.getHours() + 1))
  );
  const [loopOption, setLoopOption] = React.useState(loopOptions[0]);
  const [openConfirmationDialog, setOpenConfirmationDialog] =
    React.useState(false);

  const convertToDateTime = (date) => {
    if (date) {
      const dateExtracted = date.split("/");
      const newDate = new Date(
        dateExtracted[2],
        Number.parseInt(dateExtracted[1]) - 1,
        dateExtracted[0]
      );
      return newDate;
    } else return null;
  };

  const onSubmit = (data) => {
    const newFromDate = convertToDateTime(data.freeTime);
    const newEndDate = convertToDateTime(data.endDateTime);

    const newEvent = {
      startTime: format(startTime, DATE_FORMAT.BACK_END_HH_mm_ss),
      startDate: newFromDate
        ? format(newFromDate, DATE_FORMAT.BACK_END_YYYY_MM_DD)
        : null,
      daily: loopOption.value === loopOptions[1].value,
      weekly: loopOption.value === loopOptions[2].value,
      endDate:
        loopOption.value !== loopOptions[0] && newEndDate
          ? format(newEndDate, DATE_FORMAT.BACK_END_YYYY_MM_DD)
          : null,
    };

    if (props.isUpdate) {
      props.handleUpdateSchedule(newEvent);
    } else {
      props.handleSubmitCreateSchedule(newEvent);
    }

    props.handleClose();
  };

  const onLoopOptionChange = (e) => {
    setLoopOption(e.target.value);
  };

  const handleOnChangeStartTime = (e) => {
    const startTime = new Date(e);
    const endTime = new Date(e.setHours(e.getHours() + 1));
    setStartTime(startTime);
    setEndTime(endTime);
  };

  const onClickUpdate = () => {
    setOpenConfirmationDialog(true);
  };

  const handleUpdate = () => {
    formRef?.current.dispatchEvent(
      new Event("submit", { cancelable: true, bubbles: true })
    );
    setOpenConfirmationDialog(false);
  };

  React.useEffect(() => {
    setValue("freeTime", format(props.startDate, DATE_FORMAT.DD_MM_YYYY));
  }, [props.startDate]);

  React.useEffect(() => {
    setStartTime(props.startDate);
    setEndTime(
      new Date(
        new Date(props.startDate).setHours(props.startDate.getHours() + 1)
      )
    );
  }, [props.startDate]);

  return (
    <div>
      <Dialog fullWidth open={props.open}>
        <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
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
              value={props.startDate}
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
                  error={errors.fromTime ? true : false}
                  defaultValue={startTime}
                  value={startTime}
                  onChange={handleOnChangeStartTime}
                />
              </Grid2>
              <Grid2 xs={6}>
                <CustomizedTimePicker
                  disabled={true}
                  name="Đến"
                  placeholder="To"
                  formName="To"
                  required={true}
                  error={errors.toTime ? true : false}
                  defaultValue={endTime}
                  value={endTime}
                />
              </Grid2>
            </Grid2>
            <FormControl style={{ width: "100%" }}>
              <CustomizedSelect
                inputId="loopOption"
                isMultipleSelect={false}
                items={loopOptions}
                value={loopOption}
                onChange={onLoopOptionChange}
                required={true}
                name="Lặp lại"
                MenuProps={MenuProps}
              />
            </FormControl>
            <CustomizedDatePicker
              name="Lặp đến"
              placeholder="Lặp đến"
              formName="endDateTime"
              views={["year", "month", "day"]}
              format={DATE_FORMAT.DD_MM_YYYY}
              value={props.startDate}
              setValue={setValue}
              getValues={getValues}
              error={errors.freeTime ? true : false}
              required={true}
              disabled={loopOption.value === "noloop" ? true : false}
            />
          </DialogContent>

          <DialogActions>
            <Button variant="outlined" autoFocus onClick={props.handleClose}>
              Trở lại
            </Button>

            {props.isUpdate ? (
              <Button variant="contained" onClick={onClickUpdate}>
                Cập nhật
              </Button>
            ) : (
              <Button variant="contained" type="submit">
                Tạo lịch
              </Button>
            )}
          </DialogActions>
        </form>
      </Dialog>

      <ConfirmationDialog
        open={openConfirmationDialog}
        title="Cập nhật lịch"
        content="Việc cập nhật sẽ ảnh hưởng đến toàn bộ lịch lặp của bạn đã tạo từ trước"
        confirmLabel="Xác nhận"
        cancelLabel="Trở về"
        handleSubmit={handleUpdate}
        handleClose={() => setOpenConfirmationDialog(false)}
      />
    </div>
  );
};

export default ScheduleDialog;
