import React from "react";
import style from "./CustomPattern.module.scss";

const CustomPattern = () => {
  return (
    <div>
      <img
        className={`${style.leftPattern}`}
        alt="left-pattern"
        src={require("../../../assets/auth-pattern-left.png")}
      />
      <img
        className={`${style.rightPattern}`}
        alt="right-pattern"
        src={require("../../../assets/auth-pattern-right.png")}
      />
    </div>
  );
};

export default CustomPattern;
