import React from "react";
import ImageSlider from "./ImageSlider/ImageSlider";
import style from "./MentorList.module.scss";
import FilterSection from "./FilterSection/FilterSection";
import MentorCard from "./MentorCard/MentorCard";
import { Grid } from "@mui/material";

const MentorList = () => {
  return (
    <div className={`${style.mentorList__container}`}>
      <ImageSlider />
      <FilterSection />
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
