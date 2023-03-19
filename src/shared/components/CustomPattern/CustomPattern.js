import React from "react";
import style from "./CustomPattern.module.scss";

const CustomPattern = ({ width, height }) => {
  return (
    <>
      <img
        className={`${style.leftPattern}`}
        alt="left-pattern"
        src={require("../../../assets/auth-pattern-left.png")}
        width={width}
        height={height}
      />
      <img
        className={`${style.rightPattern}`}
        alt="right-pattern"
        src={require("../../../assets/auth-pattern-right.png")}
        width={width}
        height={height}
      />
    </>
  );
};

export default CustomPattern;
