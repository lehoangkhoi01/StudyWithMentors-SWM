import React from "react";
import style from "./RatingSection.module.scss";
import { Typography } from "@mui/material";

const RatingSection = (props) => {
  return (
    <div className={`${style.ratingSection__container}`}>
      {props.feedbacks.map((feedback) => (
        <div
          key={`ratingSection__feedback${feedback.id}`}
          className={`${style.ratingSection__feedbackCard}`}
        >
          <Typography>{feedback.content}</Typography>
          <Typography color="#fdbc00" fontWeight={600} fontSize="1.2rem">
            {feedback.rating}/5
          </Typography>
        </div>
      ))}
    </div>
  );
};

export default RatingSection;
