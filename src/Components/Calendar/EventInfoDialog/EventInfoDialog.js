import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import SquareIcon from "@mui/icons-material/Square";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import style from "./EventInfoDialog.module.scss";
import { format } from "date-fns";
import { DATE_FORMAT } from "../../../shared/constants/common";
import RemoveOptionScheduleDialog from "../RemoveOptionScheduleDialog.js/RemoveOptionScheduleDialog";
import ScheduleDialog from "../ScheduleDialog/ScheduleDialog";
import CustomizedButton from "../../../shared/components/Button/CustomizedButton";
import ConfirmationDialog from "../../../shared/components/ConfirmationDialog/ConfirmationDialog";

const EventInfoDialog = (props) => {
  const [openDeleteOption, setOpenDeleteOption] = React.useState(false);
  const [openScheduleDialog, setOpenScheduleDialog] = React.useState(false);
  const [openConfirmationDialog, setOpenConfirmationDialog] =
    React.useState(false);

  const handleOpenDeleteOption = (status) => {
    setOpenDeleteOption(status);
  };

  const handleOpenScheduleDialog = (status) => {
    setOpenScheduleDialog(status);
  };

  const formatedEventDateTime = (startTime, endTime) => {
    if (startTime && endTime) {
      return (
        format(startTime, DATE_FORMAT.DD_MM_YYYY) +
        " - Từ " +
        format(startTime, DATE_FORMAT.HH_mm) +
        " đến " +
        format(endTime, DATE_FORMAT.HH_mm)
      );
    } else return null;
  };

  const onRemoveSchedule = async () => {
    if (props.event?.belongToSeries) {
      handleOpenDeleteOption(true);
    } else {
      setOpenConfirmationDialog(true);
    }
  };

  const handleRemoveSingleSchedule = async () => {
    await props.handleRemoveSchedule(props.event?.scheduleId, false, null);
    setOpenConfirmationDialog(false);
    props.handleClose();
  };

  const handleUpdateSchedule = (data) => {
    props.handleSubmitUpdateSchedule(props.event?.scheduleId, data);
    props.handleClose();
  };

  return (
    <div>
      <Dialog fullWidth open={props.open} onClose={props.handleClose}>
        <DialogTitle
          fontWeight={700}
          fontSize="2rem"
          textAlign="center"
          color="#283493"
        >
          Thông tin khung giờ
        </DialogTitle>
        <DialogContent>
          <div className={`${style.eventDialog__container}`}>
            <SquareIcon
              className={`${style.freeTime} ${style.eventDialog__icon}`}
            />
            <Typography fontSize="1.2rem" fontWeight={600}>
              {props.event?.title}
            </Typography>
          </div>
          <div className={`${style.eventDialog__container}`}>
            <AccessTimeIcon className={`${style.eventDialog__icon}`} />
            <Typography fontSize="1.2rem">
              {formatedEventDateTime(props.event?.start, props.event?.end)}
            </Typography>
          </div>
        </DialogContent>
        {props.event?.start > new Date() && (
          <DialogActions
            sx={{ width: "60%", alignSelf: "flex-end", marginLeft: "auto" }}
          >
            <CustomizedButton
              color="primary600"
              variant="outlined"
              size="small"
              onClick={onRemoveSchedule}
            >
              Xóa
            </CustomizedButton>
            <CustomizedButton
              color="primary600"
              variant="contained"
              size="small"
              onClick={() => handleOpenScheduleDialog(true)}
            >
              Chỉnh sửa
            </CustomizedButton>
          </DialogActions>
        )}
      </Dialog>

      <RemoveOptionScheduleDialog
        open={openDeleteOption}
        handleOpenDeleteOption={handleOpenDeleteOption}
        handleRemoveSchedule={props.handleRemoveSchedule}
        handleCloseEventInfoDialog={props.handleClose}
        event={props.event}
      />
      {openScheduleDialog && (
        <ScheduleDialog
          open={openScheduleDialog}
          handleClose={() => handleOpenScheduleDialog(false)}
          startDate={props.event?.start ?? new Date()}
          handleUpdateSchedule={handleUpdateSchedule}
          isUpdate={true}
        />
      )}

      <ConfirmationDialog
        open={openConfirmationDialog}
        title="Xóa lịch"
        content="Bạn có chắc muốn xóa lịch này không?"
        confirmLabel="Xác nhận"
        cancelLabel="Quay lại"
        handleClose={() => setOpenConfirmationDialog(false)}
        handleSubmit={handleRemoveSingleSchedule}
      />
    </div>
  );
};

export default EventInfoDialog;
