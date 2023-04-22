import React from "react";
import ImageSlider from "./ImageSlider/ImageSlider";
import style from "./MentorList.module.scss";
import FilterSection from "./FilterSection/FilterSection";

const MentorList = () => {
  return (
    <div className={`${style.mentorList__container}`}>
      <ImageSlider />
      <FilterSection />
    </div>
  );
};

export default MentorList;
