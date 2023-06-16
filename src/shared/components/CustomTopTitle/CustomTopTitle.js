import React from "react";
import style from "./CustomTopTitle.module.scss";

const CustomTopTitle = ({ title }) => {
  return (
    <div className={`${style.title}`}>
      <h4>{title}</h4>
    </div>
  );
};

export default CustomTopTitle;
