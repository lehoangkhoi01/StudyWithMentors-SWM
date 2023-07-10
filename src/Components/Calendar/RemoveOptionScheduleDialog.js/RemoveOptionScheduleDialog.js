import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { format } from "date-fns";
import { DATE_FORMAT } from "../../../shared/constants/common";
import React from "react";

const removeOptions = [
  { label: "Chỉ lịch này", value: "Single" },
  { label: "Tất cả lịch lặp", value: "Series" },
];

const RemoveOptionScheduleDialog = (props) => {
  const [removeOption, setRemoveOption] = React.useState(
    removeOptions[0].value
  );

  const onRadioChange = (e) => {
    setRemoveOption(e.target.value);
  };

  const onSubmitDelete = async () => {
    if (removeOption === removeOptions[1].value) {
      await props.handleRemoveSchedule(props.event?.scheduleId, false, null);
    } else {
      const exceptionDate = format(
        props.event?.start,
        DATE_FORMAT.BACK_END_YYYY_MM_DD
      );
      const data = {
        parentId: props.event?.scheduleId,
        exceptionDate: exceptionDate,
        remove: true,
      };
      await props.handleRemoveSchedule(props.event?.scheduleId, true, data);
    }
    props.handleOpenDeleteOption(false);
    props.handleCloseEventInfoDialog();
  };

  return (
    <div>
      <Dialog open={props.open} fullWidth>
        <DialogTitle>
          <Typography variant="h5">Xóa lịch</Typography>
        </DialogTitle>
        <DialogContent>
          <FormControl>
            <RadioGroup
              name="remove-schedule-option"
              value={removeOption}
              onChange={onRadioChange}
            >
              {removeOptions.map((option, index) => (
                <FormControlLabel
                  key={`remove-schedule-option-${index}`}
                  value={option.value}
                  label={option.label}
                  control={<Radio />}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => props.handleOpenDeleteOption(false)}
          >
            Quay lại
          </Button>
          <Button variant="contained" onClick={onSubmitDelete}>
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RemoveOptionScheduleDialog;
