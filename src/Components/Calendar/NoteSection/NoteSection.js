import { Typography } from "@mui/material";
import SquareIcon from "@mui/icons-material/Square";
import style from "./NoteSection.module.scss";
import React from "react";
import { OTHER_TEXT, TITLE } from "../../../shared/constants/common";

const NoteSection = () => {
  return (
    <div className={`${style.noteSection__wrapper}`}>
      <Typography variant="h5">{TITLE.LABEL}</Typography>
      <div className={`${style.noteSection__label}`}>
        <SquareIcon
          fontSize="large"
          className={`${style.noteSection__freeLabel}`}
        />{" "}
        {OTHER_TEXT.FREE_SCHEDULE}
      </div>
      <div className={`${style.noteSection__label}`}>
        <SquareIcon
          fontSize="large"
          className={`${style.noteSection__bookedLabel}`}
        />{" "}
        {OTHER_TEXT.BOOKED_SCHEDULE}
      </div>
      <div className={`${style.noteSection__label}`}>
        <SquareIcon
          fontSize="large"
          className={`${style.noteSection__acceptedLabel}`}
        />{" "}
        {OTHER_TEXT.ACCEPTED_SCHEDULE}
      </div>
    </div>
  );
};

export default NoteSection;
