import React from "react";
import { Icon } from "@mui/material";

const Logo = ({ src, height, width, sx }) => {
  return (
    <Icon sx={sx}>
      <img src={src} height={height} width={width} />
    </Icon>
  );
};

export default Logo;
