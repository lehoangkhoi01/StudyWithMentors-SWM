import React, { useState } from "react";
import { Typography } from "@mui/material";
import { format } from "date-fns";
import { DATE_FORMAT } from "../../../shared/constants/common";
import style from "./SummaryStep.module.scss";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../../../Store/slices/userSlice";

const SummaryStep = (props) => {
  const userInfo = useSelector(selectUserInfo);
  const [participantsList, setParticipantsList] = useState([]);

  const renderStartEndTime = () => {
    return (
      format(props.selectedSlot?.start, DATE_FORMAT.HH_mm) +
      "-" +
      format(props.selectedSlot?.end, DATE_FORMAT.HH_mm) +
      ", " +
      format(props.selectedSlot?.start, DATE_FORMAT.DD_MM_YYYY)
    );
  };

  React.useEffect(() => {
    let newList = [userInfo];
    if (props.selectedStudents) {
      newList = newList.concat(props.selectedStudents);
    }
    setParticipantsList(newList);
  }, []);

  return (
    <div>
      <Typography className={`${style.bookingSummary__title}`} variant="h5">
        Xác nhận thông tin
      </Typography>
      <div className={`${style.bookingSummary__detail}`}>
        <span className={`${style.bookingSummary__subTitle}`}>Mentor: </span>
        <span>{props.mentorInfo?.fullName}</span>
      </div>

      <div className={`${style.bookingSummary__detail}`}>
        <span className={`${style.bookingSummary__subTitle}`}>Chủ đề: </span>
        <span>{props.selectedTopic?.name}</span>
      </div>

      <div className={`${style.bookingSummary__detail}`}>
        <span className={`${style.bookingSummary__subTitle}`}>Thời gian: </span>
        <span>{renderStartEndTime()}</span>
      </div>

      <div className={`${style.bookingSummary__detail}`}>
        <span className={`${style.bookingSummary__subTitle}`}>Mô tả: </span>
        <span>
          {props.studentNote?.trim().length > 0
            ? props.studentNote
            : "(Không có)"}
        </span>
      </div>
      <div className={`${style.bookingSummary__detail}`}>
        <span className={`${style.bookingSummary__subTitle}`}>
          Người tham gia:{" "}
        </span>
        <span>
          {participantsList.length > 0
            ? participantsList.map((student) => student.fullName).join(", ")
            : "(Không có)"}
        </span>
      </div>
    </div>
  );
};

export default SummaryStep;
