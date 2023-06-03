/* 
  Component: ListFileDisplay
  Purpose: Show attachment files of the seminars when users upload or only view seminars
  Props:
    + mode: Which mode the list file will display (create, update, view)
    + isUpdate: flag to regconize the seminar in UPDATE or CREATE mode
    + items: the array of files for uploading new files (when in create or edit mode)
    + oldItems: the array of file that contains uploaded files (use for update or view mode)
    + onRemove: function to remove an item in 'items' props
    + handleRemoveOldDocuments: function to remove an item in 'oldItems' props
*/
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
import { SEMINAR_DETAIL_VIEW_MODE } from "../../constants/systemType";

const ListFileDisplay = (props) => {
  const renderListForUpdate = () => (
    <div>
      <Typography className={`${style.filelist__label}`}>Tài liệu</Typography>
      <List>
        {props.oldItems?.map((file, index) => (
          <ListItem key={index} className={`${style.filelist__row}`}>
            <a href={file}>Attachment {index + 1}</a>
            <div className={`${style.filelist__right}`}>
              <ListItemIcon>
                <IconButton
                  onClick={() => props.handleRemoveOldDocuments(index)}
                >
                  <CloseIcon />
                </IconButton>
              </ListItemIcon>
            </div>
          </ListItem>
        ))}
      </List>
      <List>
        {Array.from(props.items)?.map((file, index) => (
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
    </div>
  );

  const renderList = () => (
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

  const renderListForView = () => (
    <div>
      <List>
        {props.oldItems?.map((file, index) => (
          <ListItem key={index} className={`${style.filelist__row}`}>
            <a href={file}>Attachment {index + 1}</a>
          </ListItem>
        ))}
      </List>
    </div>
  );

  if (props.mode === SEMINAR_DETAIL_VIEW_MODE.UPDATE) {
    return renderListForUpdate();
  } else if (props.mode === SEMINAR_DETAIL_VIEW_MODE.CREATE) {
    return renderList();
  } else {
    return renderListForView();
  }
};

export default ListFileDisplay;
