import React from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import style from "./CommentAction.module.scss";
import { deleteDocument } from "../../../../firebase/firebaseService";

const CommentAction = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDelete = async () => {
    try {
      handleClose();
      await deleteDocument("comments", props.comment.id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateComment = (comment) => {
    props.onUpdateComment(comment);
  };

  return (
    <div className={`${style.commentAction__actionContainer}`}>
      <div className={`${style.commentAction__upvoteContainer}`}>
        {props.comment.voteList?.includes("H8ajNk6j55TLaxbzT1OS") ? (
          <>
            <ArrowDropUpIcon
              onClick={() => props.handleUpvoteComment(props.comment, "unvote")}
              className={`${style.commentAction__upvoteContainer__icon} ${style.commentAction__upvoteContainer__icon_clicked}`}
            />
            {props.comment.vote}
          </>
        ) : (
          <>
            <ArrowDropUpIcon
              onClick={() => props.handleUpvoteComment(props.comment, "upvote")}
              className={`${style.commentAction__upvoteContainer__icon}`}
            />
            {props.comment.vote}
          </>
        )}
      </div>
      <IconButton
        onClick={handleClick}
        aria-controls={open ? "basic-menu" + props.comment.id : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id={"basic-menu" + props.comment.id}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button" + props.comment.id,
        }}
      >
        <MenuItem onClick={() => handleUpdateComment(props.comment)}>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <ListItemText>Chỉnh sửa</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          <ListItemText>Xóa</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default CommentAction;
