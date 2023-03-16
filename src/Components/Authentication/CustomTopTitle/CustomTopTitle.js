import React from "react";
import style from "./CustomTopTitle.module.scss";

const CustomTopTitle = ({ title }) => {
  return <div className={`${style.title}`}>{title}</div>;
};

export default CustomTopTitle;
