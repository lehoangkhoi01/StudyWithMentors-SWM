import React, { useState } from "react";
import ImageSlider from "./ImageSlider/ImageSlider";
import style from "./MentorList.module.scss";
import FilterSection from "./FilterSection/FilterSection";
import MentorCard from "./MentorCard/MentorCard";
import { Grid } from "@mui/material";

const MentorList = () => {
  const [majorName, setMajorName] = useState([]);
  const [categoryName, setCategoryName] = useState([]);

  const handleMajoreChange = (event) => {
    const {
      target: { value },
    } = event;
    setMajorName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleCategoryChange = (event) => {
    const {
      target: { value },
    } = event;
    setCategoryName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div className={`${style.mentorList__container}`}>
      <ImageSlider />
      <FilterSection
        majorName={majorName}
        categoryName={categoryName}
        handleMajoreChange={handleMajoreChange}
        handleCategoryChange={handleCategoryChange}
      />
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <MentorCard />
        </Grid>
        <Grid item xs={3}>
          <MentorCard />
        </Grid>
        <Grid item xs={3}>
          <MentorCard />
        </Grid>
        <Grid item xs={3}>
          <MentorCard />
        </Grid>
      </Grid>
    </div>
  );
};

export default MentorList;
