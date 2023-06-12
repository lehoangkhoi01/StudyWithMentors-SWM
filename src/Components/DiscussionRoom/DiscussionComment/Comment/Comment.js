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

const Comment = (props) => {
  const [updatedComment, setUpdatedComment] = React.useState(null);

  const onUpdateComment = (comment) => {
    setUpdatedComment(comment);
    localStorage.setItem("SHOULD_RERENDER_COMMENT", "false");
  };

  const onCancelUpdateComment = () => {
    setUpdatedComment(null);
  };

  const onChangeUpdateComment = (e) => {
    setUpdatedComment(e.target.value);
  };

  const handleSubmitUpdateComment = async () => {
    const updatedCommentObject = {
      message: updatedComment,
      serverTimeStamp: Timestamp.now(),
    };
    try {
      localStorage.setItem("SHOULD_RERENDER_COMMENT", "true");
      await updateDocument("comments", props.comment.id, updatedCommentObject);
      setUpdatedComment(null);
    } catch (error) {
      console.log(error);
    }
  };

  const updateCommentBox = (
    <div>
      <OutlinedInput
        value={updatedComment?.message}
        onChange={onChangeUpdateComment}
        fullWidth
        multiline
        rows={2}
        placeholder="Hãy nhập câu hỏi của bạn"
        className={`${style.comment__textbox}`}
      />
      <div className={`${style.comment__buttonContainer}`}>
        <CustomizedButton
          onClick={onCancelUpdateComment}
          variant="outlined"
          color="primary600"
        >
          Hủy
        </CustomizedButton>
        <CustomizedButton
          onClick={handleSubmitUpdateComment}
          variant="contained"
          color="primary600"
        >
          Cập nhật
        </CustomizedButton>
      </div>
    </div>
  );

  return (
    <>
      {updatedComment ? (
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
                    alt={props.comment.userInfo?.name}
                    src={props.comment.userInfo?.avatarUrl}
                  />
                </ListItemAvatar>
                <div>
                  <Typography fontWeight={600} fontSize={"1.2rem"}>
                    {props.comment.userInfo?.name}
                  </Typography>
                  <Typography variant="subtitle2" color="text.secondary">
                    Gửi lúc {props.comment.createdDate}
                  </Typography>
                </div>
              </div>
            }
            secondary={
              <>
                <Typography color="text.primary">
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
