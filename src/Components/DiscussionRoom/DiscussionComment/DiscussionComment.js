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
  Button,
  OutlinedInput,
} from "@mui/material";
import CustomizedButton from "../../../shared/components/Button/CustomizedButton";
import style from "./DiscussionComment.module.scss";
import { styled } from "@mui/material/styles";
import { doc } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { addDocument } from "../../../firebase/firebaseService";

import Comment from "./Comment/Comment";

const DiscussionComment = (props) => {
  const [expanded, setExpanded] = React.useState(false);
  const [currentReply, setCurrentReply] = React.useState("");

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  const handleReplyChange = (e) => {
    if (e.target.value) {
      setCurrentReply(e.target.value);
    }
  };

  const renderReplies = (replies) => {
    return replies.map((reply) => (
      <Comment key={"reply" + reply.id} comment={reply} isReply={true} />
    ));
  };

  const handleSubmit = () => {
    const requestBody = {
      parentId: props.comment.id,
      message: currentReply,
      user: doc(db, "users/TvmDbIY8sl4HNtUL1RX1"),
      vote: 0,
    };
    try {
      addDocument("comments", requestBody);
      setCurrentReply("");
    } catch (error) {
      console.log(error);
    }
  };

  const StyledAccordionSummary = styled(AccordionSummary)`
    & .MuiAccordionSummary-content {
      flex-direction: column;
    }
    box-shadow: none;
  `;

  return (
    <Accordion expanded={expanded} sx={{ boxShadow: "none" }}>
      <StyledAccordionSummary
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Comment
          comment={props.comment}
          setShouldRerender={props.setShouldRerender}
          isReply={false}
        />
        <Button
          className={`${style.discussionComment__button}`}
          onClick={handleExpand}
        >
          Xem trả lời {props.replies && "(" + props.replies?.length + ")"}
        </Button>
      </StyledAccordionSummary>

      <AccordionDetails>
        {props.replies?.length > 0 ? renderReplies(props.replies) : null}
        <div className={`${style.discussionComment__replyContainer}`}>
          <OutlinedInput
            value={currentReply}
            fullWidth
            multiline
            rows={2}
            onChange={handleReplyChange}
            placeholder="Phản hồi tại đây..."
            className={`${style.discussionComment__textbox}`}
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
