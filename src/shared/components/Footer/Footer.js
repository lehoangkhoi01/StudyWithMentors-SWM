import React from "react";
import style from "./Footer.module.scss";
import { TITLE } from "../../constants/common";

const Footer = () => {
  return (
    <div className={`${style.footer__container}`}>
      <p>{TITLE.FOOTER}</p>
    </div>
  );
};

export default Footer;
