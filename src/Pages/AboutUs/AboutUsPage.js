import { Divider, Typography } from "@mui/material";
import { intro, solution } from "./content";
import style from "./AboutUsPage.module.scss";
import React from "react";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

const AboutUsPage = () => {
  return (
    <div className={`${style.about__container}`}>
      <div>
        <Typography
          fontWeight={600}
          variant="h3"
          color="#283493"
          textAlign="center"
          marginBottom={2}
        >
          Growth Me
        </Typography>
      </div>
      <div className={`${style.about__intro}`}>
        <Typography variant="body1">{intro.par1}</Typography>
        <Typography variant="body1">{intro.par2}</Typography>
        <Typography variant="body1">{intro.par3}</Typography>
        <Typography>
          <div>{`- Trao đổi, giải đáp thắc mắc sau ngay cả sau khi sự kiện đã kết thúc.`}</div>
          <div>{`- Kết nối giữa mentor - là những diễn giả với sinh viên Đại học FPT.`}</div>
        </Typography>
      </div>
      <Grid2 container justifyContent="center" gap={2} marginTop={3}>
        <Grid2 xs={5}>
          <Typography
            fontWeight={500}
            variant="h6"
            color="#283493"
            textAlign="center"
            marginBottom={1}
          >
            Hỏi & Đáp sau hội thảo
          </Typography>
          <Typography variant="body1">{solution.solution1}</Typography>
        </Grid2>
        <Divider orientation="vertical" flexItem />
        <Grid2 xs={5}>
          <Typography
            fontWeight={500}
            variant="h6"
            color="#283493"
            textAlign="center"
            marginBottom={1}
          >
            Kết nối Sinh viên đến với các Chuyên gia
          </Typography>
          <Typography variant="body1">{solution.solution2}</Typography>
        </Grid2>
      </Grid2>
    </div>
  );
};

export default AboutUsPage;
