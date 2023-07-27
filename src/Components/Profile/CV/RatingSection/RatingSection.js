import React from "react";
import style from "./RatingSection.module.scss";
import { Avatar, Typography, Rating } from "@mui/material";
import { format } from "date-fns";
import { DATE_FORMAT } from "../../../../shared/constants/common";

const RatingSection = (props) => {
  return (
    <div className={`${style.ratingSection__container}`}>
      {props.feedbacks.map((feedback) => (
        <div
          key={`ratingSection__feedback${feedback.id}`}
          className={`${style.ratingSection__feedbackCard}`}
        >
          <Avatar src={feedback.giver.avatarLink} />
          <div>
            <Typography fontWeight={600} fontSize="1.2rem" color="#283493">
              {feedback.giver.fullName}
            </Typography>
            <Rating value={feedback.rating} readOnly />
            <Typography>{feedback.content}</Typography>
          </div>
          <Typography marginLeft="auto">
            {format(new Date(feedback.feedbackDate), "HH:mm") +
              " " +
              format(new Date(feedback.feedbackDate), DATE_FORMAT.DD_MM_YYYY)}
          </Typography>
        </div>
      ))}
    </div>
  );
};

export default RatingSection;
