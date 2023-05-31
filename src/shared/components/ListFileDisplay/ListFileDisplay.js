import React from "react";
import {
  ListItem,
  ListItemIcon,
  Typography,
  List,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import style from "./ListFileDisplay.module.scss";
import { convertBytesToMB } from "../../../Helpers/mathHelper";

const ListFileDisplay = (props) => {
  return (
    <div>
      <Typography className={`${style.filelist__label}`}>Tài liệu</Typography>
      {props?.items?.length > 0 ? (
        <List>
          {Array.from(props.items).map((file, index) => (
            <ListItem key={index} className={`${style.filelist__row}`}>
              <Typography>{file.name}</Typography>
              <div className={`${style.filelist__right}`}>
                <Typography>{convertBytesToMB(file.size)}MB</Typography>
                <ListItemIcon>
                  <IconButton onClick={() => props.onRemove(index)}>
                    <CloseIcon />
                  </IconButton>
                </ListItemIcon>
              </div>
            </ListItem>
          ))}
        </List>
      ) : null}
    </div>
  );
};

export default ListFileDisplay;
