import React from "react";
import style from "./Footer.module.scss";
import { TITLE } from "../../constants/common";

const Footer = () => {
  return (
    <div id="app_footer" className={`${style.footer__container}`}>
      <p>{TITLE.FOOTER}</p>
      <p>Mọi đóng góp xin liên hệ growthme@gmail.com</p>
    </div>
  );
};

export default Footer;
