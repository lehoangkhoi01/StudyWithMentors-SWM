import React from "react";
import style from "./RatingSection.module.scss";
import { Avatar, Typography, Rating } from "@mui/material";

const RatingSection = (props) => {
  console.log(props);
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
        </div>
      ))}
    </div>
  );
};

export default RatingSection;
