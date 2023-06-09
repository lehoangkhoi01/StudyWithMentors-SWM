/*
    Component: DiscussionComment
    Purpose: To display the single user's comment and its replies
    Component's props: 
        - comment(obj): the comment object fetched from firestore
        - handleUpvoteComment(func): the function to handle the upvote and unvote action
*/

import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  ListItem,
  Avatar,
  ListItemAvatar,
  ListItemText,
  Typography,
  Button,
  OutlinedInput,
} from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import CustomizedButton from "../../../shared/components/Button/CustomizedButton";
import style from "./DiscussionComment.module.scss";
import { doc } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { addDocument } from "../../../firebase/firebaseService";

const DiscussionComment = (props) => {
  const [expanded, setExpanded] = React.useState(false);
  const [currentReply, setCurrentReply] = React.useState("");
  const handleExpand = () => {
    setExpanded(!expanded);
  };

  const handleReplyChange = (e) => {
    if (e.target.value && e.target.value.trim() !== "") {
      setCurrentReply(e.target.value);
    }
  };

  const renderUpvoteSection = (comment) => {
    return comment.parentId ? null : (
      <div className={`${style.discussionComment__upvoteContainer}`}>
        {comment.voteList?.includes("H8ajNk6j55TLaxbzT1OS") ? (
          <>
            <ArrowDropUpIcon
              onClick={() => props.handleUpvoteComment(comment, "unvote")}
              className={`${style.discussionComment__upvoteContainer__icon} ${style.discussionComment__upvoteContainer__icon_clicked}`}
            />
            {comment.vote}
          </>
        ) : (
          <>
            <ArrowDropUpIcon
              onClick={() => props.handleUpvoteComment(comment, "upvote")}
              className={`${style.discussionComment__upvoteContainer__icon}`}
            />
            {comment.vote}
          </>
        )}
      </div>
    );
  };

  const renderReplies = (replies) => {
    return replies.map((reply) => (
      <ListItem
        key={`comment${reply.id}`}
        alignItems="flex-start"
        className={`${style.discussionComment__accordionSummary}`}
      >
        <ListItemText
          primary={
            <div className={`${style.discussionComment__userInfo}`}>
              <ListItemAvatar>
                <Avatar
                  alt={reply.userInfo?.name}
                  src={reply.userInfo?.avatarUrl}
                />
              </ListItemAvatar>
              <div>
                <Typography fontWeight={600} fontSize={"1.2rem"}>
                  {reply.userInfo?.name}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  Gửi lúc {reply.createdDate}
                </Typography>
              </div>
            </div>
          }
          secondary={
            <>
              <Typography color="text.primary">{reply.message}</Typography>
            </>
          }
        ></ListItemText>
      </ListItem>
    ));
  };

  const handleSubmit = () => {
    const requestBody = {
      parentId: props.comment.id,
      message: currentReply,
      user: doc(db, "users/TvmDbIY8sl4HNtUL1RX1"),
    };
    try {
      addDocument("comments", requestBody);
      setCurrentReply("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Accordion expanded={expanded}>
      <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
        <ListItem
          key={`comment${props.comment.id}`}
          alignItems="flex-start"
          secondaryAction={renderUpvoteSection(props.comment)}
          className={`${style.discussionComment__accordionSummary}`}
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
                <Button
                  className={`${style.discussionComment__button}`}
                  onClick={handleExpand}
                >
                  Xem trả lời
                </Button>
              </>
            }
          ></ListItemText>
        </ListItem>
      </AccordionSummary>

      <AccordionDetails>
        {props.replies?.length > 0 ? renderReplies(props.replies) : null}
        <div>
          <OutlinedInput
            value={currentReply}
            fullWidth
            multiline
            rows={2}
            onChange={handleReplyChange}
            placeholder="Hãy nhập câu hỏi của bạn"
            className={`${style.discussion__textbox}`}
          />
          <div className={`${style.discussionComment__buttonContainer}`}>
            <CustomizedButton
              onClick={handleSubmit}
              variant="contained"
              color="primary600"
            >
              Gửi phản hồi
            </CustomizedButton>
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default DiscussionComment;
