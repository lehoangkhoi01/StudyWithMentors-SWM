import React from "react";
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Typography,
  Avatar,
  OutlinedInput,
} from "@mui/material";
import CommentAction from "../CommentAction/CommentAction";
import CustomizedButton from "../../../../shared/components/Button/CustomizedButton";
import style from "./Comment.module.scss";
import { Timestamp } from "firebase/firestore";
import { updateDocument } from "../../../../firebase/firebaseService";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

const Comment = (props) => {
  const [updatedComment, setUpdatedComment] = React.useState(undefined);

  const onUpdateComment = (comment) => {
    setUpdatedComment(comment);
    props.updateLocalStorage("false");
    localStorage.setItem("SHOULD_RERENDER_COMMENT", "false");
  };

  const onCancelUpdateComment = () => {
    setUpdatedComment(undefined);
  };

  const onChangeUpdateComment = (e) => {
    setUpdatedComment(e.target.value);
  };

  const handleSubmitUpdateComment = async () => {
    if (updatedComment.trim()) {
      const updatedCommentObject = {
        message: updatedComment.trim(),
        serverTimeStamp: Timestamp.now(),
      };
      try {
        localStorage.setItem("SHOULD_RERENDER_COMMENT", "true");
        await updateDocument(
          "Comments",
          props.comment.id,
          updatedCommentObject
        );
        setUpdatedComment(null);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const updateCommentBox = (
    <div className={`${style.comment__editTextbox}`}>
      <OutlinedInput
        value={updatedComment?.message}
        onChange={onChangeUpdateComment}
        fullWidth
        multiline
        rows={2}
        placeholder="Hãy nhập câu hỏi của bạn"
        className={`${style.comment__textbox}`}
      />
      <Grid2
        container
        spacing={2}
        className={`${style.comment__buttonContainer}`}
      >
        <Grid2 xs={12} md={6}>
          <CustomizedButton
            onClick={onCancelUpdateComment}
            variant="outlined"
            color="primary600"
          >
            Hủy
          </CustomizedButton>
        </Grid2>

        <Grid2 xs={12} md={6}>
          <CustomizedButton
            onClick={handleSubmitUpdateComment}
            variant="contained"
            color="primary600"
          >
            Cập nhật
          </CustomizedButton>
        </Grid2>
      </Grid2>
    </div>
  );

  return (
    <>
      {updatedComment != undefined ? (
        updateCommentBox
      ) : (
        <ListItem
          key={`comment${props.comment.id}`}
          alignItems="flex-start"
          secondaryAction={
            <CommentAction
              comment={props.comment}
              handleUpvoteComment={props.handleUpvoteComment}
              onUpdateComment={onUpdateComment}
            />
          }
          className={
            props.isReply
              ? `${style.comment__accordionSummary} ${style.comment__reply}`
              : `${style.comment__accordionSummary}`
          }
        >
          <ListItemText
            primary={
              <div className={`${style.comment__userInfo}`}>
                <ListItemAvatar>
                  <Avatar
                    alt={props.comment.userInfo?.fullName}
                    src={props.comment.userInfo?.avatarUrl}
                  />
                </ListItemAvatar>
                <div>
                  <Typography fontWeight={600} fontSize={"1.2rem"}>
                    {props.comment.userInfo?.fullName}
                  </Typography>
                  <Typography variant="subtitle2" color="text.secondary">
                    Gửi lúc {props.comment.createdDate}
                  </Typography>
                </div>
              </div>
            }
            secondary={
              <>
                <Typography width="90%" color="text.primary">
                  {props.comment.message}
                </Typography>
              </>
            }
          ></ListItemText>
        </ListItem>
      )}
    </>
  );
};

export default Comment;
