import { Button } from "@mui/material";
import style from "./CustomizedButton.module.scss";

const CustomizedButton = (props) => {
  return (
    <Button
      fullWidth
      type={props.type}
      variant={props.variant}
      className={`${style.btn} ${style[`${props.color}__${props.variant}`]} ${
        props.className
      }`}
      onClick={props.onClick}
    >
      {props.children}
    </Button>
  );
};

export default CustomizedButton;
