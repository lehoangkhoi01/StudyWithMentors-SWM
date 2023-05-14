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
//import dayjs from "dayjs";
import CustomizedDatePicker from "../../../shared/components/DatePicker/CustomizedDatePicker";
import CustomizedTimePicker from "../../../shared/components/TimePicker/CustomizedTimePicker";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import CustomizedSelect from "../../../shared/components/Select/CustomizedSelect";
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
  const { register, setValue } = useForm();

  return (
    <div>
      <Dialog fullWidth open={props.open}>
        <DialogTitle>
          <Typography variant="h5">Lịch nhận cố vấn</Typography>
        </DialogTitle>
        <DialogContent>
          <CustomizedDatePicker
            name="Thời gian"
            placeholder="Thời gian"
            formName="Thời gian"
            setValue={setValue}
            options={{ ...register("date-picker") }}
            required={true}
          />
          <Grid2 container spacing={2}>
            <Grid2 xs={6}>
              <CustomizedTimePicker
                name="From"
                placeholder="From"
                formName="From"
                required={true}
                defaultValue={new Date()}
              />
            </Grid2>
            <Grid2 xs={6}>
              <CustomizedTimePicker
                name="To"
                placeholder="To"
                formName="To"
                required={true}
                defaultValue={
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
          <Button variant="contained">Lưu lịch</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ScheduleDialog;
