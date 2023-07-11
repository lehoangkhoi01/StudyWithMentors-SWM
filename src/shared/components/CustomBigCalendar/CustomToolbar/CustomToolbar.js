import React from "react";
import {
  Toolbar,
  Typography,
  FormControl,
  IconButton,
  Button,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChervonRightIcon from "@mui/icons-material/ChevronRight";
import CustomizedSelect from "../../Select/CustomizedSelect";
import style from "./CustomToolbar.module.scss";
import { BUTTON_LABEL } from "../../../constants/common";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const CustomToolbar = (props) => {
  const { views, onNavigate, label } = props;
  const viewMap = [
    { name: "Tuần", value: views[0] },
    { name: "Lịch biểu", value: views[1] },
  ];
  const [currentView, setCurrentView] = React.useState(viewMap[0]);

  const handleChange = (event) => {
    const view = event.target.value;
    setCurrentView(view);
    props.onView(view.value);
  };

  return (
    <Toolbar>
      <div style={{ width: "100%" }} className={`${style.customToolbar}`}>
        <Button
          className={`${style.customToolbar__button}`}
          variant="outlined"
          onClick={() => onNavigate("TODAY")}
        >
          {BUTTON_LABEL.TODAY}
        </Button>

        <div className={`${style.customToolbar__dateNavigate}`}>
          <IconButton
            size="large"
            className={`${style.customToolbar__icon}`}
            onClick={() => onNavigate("PREV")}
          >
            <ChevronLeftIcon />
          </IconButton>
          <Typography
            variant="headline"
            style={{ textTransform: "capitalize" }}
          >
            {label}
          </Typography>
          <IconButton
            size="large"
            className={`${style.customToolbar__icon}`}
            onClick={() => onNavigate("NEXT")}
          >
            <ChervonRightIcon />
          </IconButton>
        </div>

        <FormControl style={{ width: "20%" }}>
          <CustomizedSelect
            inputId="calendarView"
            items={viewMap}
            value={currentView}
            isMultipleSelect={false}
            onChange={handleChange}
            MenuProps={MenuProps}
            renderValue={(selected) => selected.name}
            required={true}
            name=""
          />
        </FormControl>
      </div>
    </Toolbar>
  );
};

export default CustomToolbar;
