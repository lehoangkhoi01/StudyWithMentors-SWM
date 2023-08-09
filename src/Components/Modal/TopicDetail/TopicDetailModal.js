import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import React from "react";
import style from "./TopicDetailModal.module.scss";
import { TOPIC_STATUS_TYPE } from "../../../shared/constants/systemType";
import { format } from "date-fns";
import { DATE_FORMAT } from "../../../shared/constants/common";

const TopicDetailModal = (props) => {
  const renderStatusLabel = (status) => {
    switch (status) {
      case TOPIC_STATUS_TYPE.ACCEPTED:
        return (
          <div
            className={`${style.topicDetail__label} ${style.topicDetail__label__accepted}`}
          >
            Đã duyệt
          </div>
        );
      case TOPIC_STATUS_TYPE.WAITING:
        return (
          <div
            className={`${style.topicDetail__label} ${style.topicDetail__label__waiting}`}
          >
            Đang chờ
          </div>
        );
      case TOPIC_STATUS_TYPE.REJECTED:
        return (
          <div
            className={`${style.topicDetail__label} ${style.topicDetail__label__canceled}`}
          >
            Từ chối
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Dialog fullWidth open={props.openModal} onClose={props.onCloseModal}>
        <DialogTitle>
          <Typography
            fontWeight={700}
            fontSize="2rem"
            textAlign="center"
            color="#283493"
          >
            Chi tiết chủ đề
          </Typography>
        </DialogTitle>
        <DialogContent>
          <div>{renderStatusLabel(props.data?.status)}</div>
          <div className={`${style.topicDetail__detail}`}>
            <span className={`${style.topicDetail__subTitle}`}>Diễn giả: </span>
            <span>{props.data?.mentor?.fullName}</span>
          </div>
          <div className={`${style.topicDetail__detail}`}>
            <span className={`${style.topicDetail__subTitle}`}>
              Tên chủ đề:{" "}
            </span>
            <span>{props.data?.name}</span>
          </div>
          <div className={`${style.topicDetail__detail}`}>
            <span className={`${style.topicDetail__subTitle}`}>Lĩnh vực: </span>
            <span>{props.data?.field}</span>
          </div>
          <div className={`${style.topicDetail__detail}`}>
            <span className={`${style.topicDetail__subTitle}`}>Thể loại: </span>
            <span>{props.data?.category}</span>
          </div>
          <div className={`${style.topicDetail__detail}`}>
            <span className={`${style.topicDetail__subTitle}`}>Mô tả: </span>
            <span>{props.data?.description}</span>
          </div>
          <div className={`${style.topicDetail__detail}`}>
            <span className={`${style.topicDetail__subTitle}`}>Ngày tạo: </span>
            <span>
              {props.data?.createdDate
                ? format(
                    new Date(props.data?.createdDate),
                    DATE_FORMAT.DD_MM_YYYY__HH_mm
                  )
                : null}
            </span>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TopicDetailModal;
