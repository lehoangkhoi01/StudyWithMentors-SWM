import React from "react";
import style from "./ImageSideContainer.module.scss";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

const ImageSideContainer = () => {
  return <Grid2 md={6} maxWidth={"50%"} className={`${style.imageSide}`} />;
};

export default ImageSideContainer;
