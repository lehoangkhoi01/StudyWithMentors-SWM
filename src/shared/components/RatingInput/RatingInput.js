import React from "react";
import { Box, Rating, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import style from "./RatingInput.module.scss";
import { RATING_LABEL } from "../../constants/systemType";

const labels = RATING_LABEL;

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

const RatingInput = (props) => {
  const [hover, setHover] = React.useState(-1);

  return (
    <div className={`${style.ratingInput__container}`}>
      <label className={`${style.ratingInput__label}`}>{props.title}</label>
      {props.error && (
        <Typography
          className={`${style.ratingInput__errorText}`}
          variant="caption"
          ml={2}
        >
          {props.error?.message}
        </Typography>
      )}
      <div className={`${style.ratingInput__wrapper}`}>
        <Rating
          size="medium"
          name={props.name}
          precision={1}
          getLabelText={getLabelText}
          onChange={props.onChange}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}
          icon={<StarIcon fontSize="medium" />}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="medium" />}
        />
        {props.field.value !== null && (
          <Box sx={{ ml: 2 }} className={`${style.ratingInput__ratingLabel}`}>
            {labels[hover !== -1 ? hover : props.field.value]}
          </Box>
        )}
      </div>
    </div>
  );
};

export default RatingInput;
