import { Typography } from "@mui/material";
import { intro, solution } from "./content";
import style from "./AboutUsPage.module.scss";
import React from "react";

const AboutUsPage = () => {
  return (
    <div className={`${style.about__container}`}>
      <div>
        <Typography
          fontWeight={600}
          variant="h1"
          color="#283493"
          textAlign="center"
          className={`${style.about__title}`}
        >
          Growth Me
        </Typography>
        <Typography
          fontWeight={500}
          variant="h5"
          color="#283493"
          textAlign="center"
          marginBottom={2}
          className={`${style.about__subTitle}`}
        >
          Phát triển bản thân, phát triển cộng đồng
        </Typography>
      </div>
      <div className={`${style.about__intro}`}>
        <div className={`${style.about__intro_img}`}>
          <img src={require("../../assets/about-us-img/Description_Img.png")} />
        </div>

        <div className={`${style.about__intro_text}`}>
          <Typography variant="body1">{intro.par1}</Typography>
          <Typography variant="body1">{intro.par2}</Typography>
        </div>
      </div>

      <div className={`${style.about__confirm}`}>
        <div className={`${style.about__confirm_title}`}>
          <img src={require("../../assets/about-us-img/Star.png")} />
          <Typography
            fontWeight={700}
            variant="h4"
            color="#283493"
            textAlign="center"
            marginBottom={2}>
            {intro.par3}</Typography>
          <img src={require("../../assets/about-us-img/Star.png")} />
        </div>

        <Typography
          color="#283493"
          textAlign="center"
          fontWeight={500}
          className={`${style.about__confirm_info}`}
        >
          {`Trao đổi, giải đáp thắc mắc sau ngay cả sau khi sự kiện đã kết thúc`}
        </Typography>
      </div>

      <div>
        <div className={`${style.about__solution_title}`}>
          <img src={require("../../assets/about-us-img/Solution_Icon_Left.png")} />
          <Typography
            fontWeight={700}
            variant="h5"
            color="#283493"
            textAlign="center"
            marginBottom={3}
          >
            Hỏi & Đáp sau hội thảo
          </Typography>
          <img src={require("../../assets/about-us-img/Solution_Icon_Right.png")} />
        </div>

        <div className={`${style.about__QA}`}>
          <div className={`${style.about__QA_description}`}>
            <Typography variant="body1">{solution.QA_1}</Typography>
            <Typography variant="body1">{solution.QA_2}</Typography>
            <Typography variant="body1">{solution.QA_3}</Typography>
          </div>

          <div className={`${style.about__QA_img}`}>
            <img src={require("../../assets/about-us-img/QA.png")} />
          </div>
        </div>
      </div>

      <div>
        <div className={`${style.about__solution_title}`}>
          <img src={require("../../assets/about-us-img/Solution_Icon_Left.png")} />
          <Typography
            fontWeight={700}
            variant="h5"
            color="#283493"
            textAlign="center"
            marginBottom={2}
          >
            Kết nối Sinh viên đến với các Chuyên gia
          </Typography>
          <img src={require("../../assets/about-us-img/Solution_Icon_Right.png")} />
        </div>


        <div className={`${style.about__mentors}`}>
          <div className={`${style.about__mentors_img}`}>
            <img src={require("../../assets/about-us-img/Mentors.png")} />
          </div>

          <div className={`${style.about__mentors_description}`}>
            <Typography variant="body1">{solution.Mentors_1}</Typography>
            <Typography variant="body1">{solution.Mentors_2}</Typography>
            <Typography variant="body1">{solution.Mentors_3}</Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
