import React from "react";
import style from "./CustomTopTitle.module.scss";

const CustomTopTitle = ({ title }) => {
  return <h1 className={`${style.title}`}>{title}</h1>;
};

export default CustomTopTitle;
