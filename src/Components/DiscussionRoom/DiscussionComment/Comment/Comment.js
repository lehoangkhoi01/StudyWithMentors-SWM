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

const Comment = (props) => {
  const [updatedComment, setUpdatedComment] = React.useState(null);

  const onUpdateComment = (comment) => {
    console.log(comment);
    setUpdatedComment(comment);
  };

  const onCancelUpdateComment = () => {
    setUpdatedComment(null);
  };

  const updateCommentBox = (
    <div>
      <OutlinedInput
        value={updatedComment?.message}
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
        <CustomizedButton variant="contained" color="primary600">
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
          className={`${style.comment__accordionSummary}`}
        >
          <ListItemText
            primary={
              <div className={`${style.discussionComment__userInfo}`}>
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
