import React from "react";
import { Box, Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import style from "./RatingInput.module.scss";

const labels = {
  1: "Không hài lòng",
  2: "Khá không hài lòng",
  3: "Bình thường",
  4: "Khá hài lòng",
  5: "Rất hài lòng",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

const RatingInput = (props) => {
  const [value, setValue] = React.useState(0);
  const [hover, setHover] = React.useState(-1);

  return (
    <div className={`${style.ratingInput__container}`}>
      <label className={`${style.ratingInput__label}`}>{props.title}</label>
      <div className={`${style.ratingInput__wrapper}`}>
        <Rating
          name="hover-feedback"
          value={value}
          precision={1}
          getLabelText={getLabelText}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />
        {value !== null && (
          <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
        )}
      </div>
    </div>
  );
};

export default RatingInput;
