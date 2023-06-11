import React from "react";
import ImageSlider from "./ImageSlider/ImageSlider";
import style from "./MentorList.module.scss";
import FilterSection from "./FilterSection/FilterSection";
import MentorCard from "./MentorCard/MentorCard";
import { Grid } from "@mui/material";
import { FILTER_SEMINAR } from "../../shared/constants/common";
import { useState } from "react";

const MentorList = () => {
  const [statusFilter, setStatusFilter] = useState(FILTER_SEMINAR.ALL);

  const onChangeStatusFilter = (status) => {
    setStatusFilter(status);
  };

  return (
    <div className={`${style.mentorList__container}`}>
      <ImageSlider />
      <FilterSection onChangeStatusFilter={onChangeStatusFilter} />
      <div className={style.mentorList__status__filter}>
        <div className={style.mentorList__status__filter__items}>
          <p
            className={
              statusFilter === FILTER_SEMINAR.ALL
                ? style.mentorList__status__filter__active
                : ""
            }
            onClick={() => {
              onChangeStatusFilter(FILTER_SEMINAR.ALL);
            }}
          >
            {FILTER_SEMINAR.ALL}
          </p>
          <p
            className={
              statusFilter === FILTER_SEMINAR.POPULAR
                ? style.mentorList__status__filter__active
                : ""
            }
            onClick={() => {
              onChangeStatusFilter(FILTER_SEMINAR.POPULAR);
            }}
          >
            {FILTER_SEMINAR.POPULAR}
          </p>
          <p
            className={
              statusFilter === FILTER_SEMINAR.FOLLOWING
                ? style.mentorList__status__filter__active
                : ""
            }
            onClick={() => {
              onChangeStatusFilter(FILTER_SEMINAR.FOLLOWING);
            }}
          >
            {FILTER_SEMINAR.FOLLOWING}
          </p>
        </div>
      </div>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4} xl={3}>
          <MentorCard />
        </Grid>
        <Grid item xs={12} md={6} lg={4} xl={3}>
          <MentorCard />
        </Grid>
        <Grid item xs={12} md={6} lg={4} xl={3}>
          <MentorCard />
        </Grid>
        <Grid item xs={12} md={6} lg={4} xl={3}>
          <MentorCard />
        </Grid>
      </Grid>
    </div>
  );
};

export default MentorList;
