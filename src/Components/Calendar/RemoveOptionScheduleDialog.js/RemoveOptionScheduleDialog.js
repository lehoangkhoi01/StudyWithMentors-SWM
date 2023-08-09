import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { format } from "date-fns";
import { DATE_FORMAT } from "../../../shared/constants/common";
import React from "react";
import CustomizedButton from "../../../shared/components/Button/CustomizedButton";

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
      await props.handleRemoveSchedule(
        props.event?.scheduleId,
        false,
        null,
        null
      );
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
      await props.handleRemoveSchedule(
        props.event?.scheduleId,
        true,
        null,
        data
      );
    }
    props.handleOpenDeleteOption(false);
    props.handleCloseEventInfoDialog();
  };

  return (
    <div>
      <Dialog open={props.open} fullWidth>
        <DialogTitle>
          <Typography
            fontWeight={700}
            fontSize="2rem"
            textAlign="center"
            color="#283493"
          >
            Xóa lịch
          </Typography>
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
        <DialogActions
          sx={{ width: "60%", alignSelf: "flex-end", marginLeft: "auto" }}
        >
          <CustomizedButton
            color="primary600"
            size="small"
            variant="outlined"
            onClick={() => props.handleOpenDeleteOption(false)}
          >
            Quay lại
          </CustomizedButton>
          <CustomizedButton
            color="primary600"
            size="small"
            variant="contained"
            onClick={onSubmitDelete}
          >
            Xóa
          </CustomizedButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RemoveOptionScheduleDialog;
