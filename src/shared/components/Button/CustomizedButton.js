import { Button } from "@mui/material";
import style from "./CustomizedButton.module.scss";

const CustomizedButton = (props) => {
  return (
    <Button
      fullWidth
      type={props.type}
      variant={props.variant}
      className={`btn ${style[`${props.color}__${props.variant}`]} ${
        props.className
      }`}
    >
      {props.children}
    </Button>
  );
};

export default CustomizedButton;
