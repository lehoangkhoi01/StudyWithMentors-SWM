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
import { useSelector } from "react-redux";
import { selectUserInfo } from "../../../Store/slices/userSlice";
import { useNotification } from "../../../Helpers/generalHelper";
import { ERROR_MESSAGES } from "../../../shared/constants/common";

const DiscussionComment = (props) => {
  const [expanded, setExpanded] = React.useState(false);
  const [currentReply, setCurrentReply] = React.useState("");
  const userInfo = useSelector(selectUserInfo);

  const { setNotification } = useNotification();

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  const handleReplyChange = (e) => {
    setCurrentReply(e.target.value);
  };

  const renderReplies = (replies) => {
    return replies.map((reply) => (
      <Comment
        key={"reply" + reply.id}
        comment={reply}
        isReply={true}
        handleUpvoteComment={props.handleUpvoteComment}
      />
    ));
  };

  const handleSubmit = () => {
    if (currentReply.trim()) {
      const requestBody = {
        seminarId: props.seminarId,
        parentId: props.comment.id,
        message: currentReply.trim(),
        user: doc(db, "Users/" + userInfo.accountId),
        vote: 0,
        voteList: [],
      };
      try {
        addDocument("Comments", requestBody);
        setCurrentReply("");
      } catch (error) {
        setNotification({
          isOpen: true,
          type: "error",
          message: ERROR_MESSAGES.COMMENT_ERROR,
        });
      }
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
          isReply={false}
          updateLocalStorage={props.updateLocalStorage}
          handleUpvoteComment={props.handleUpvoteComment}
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

        {userInfo && (
          <div className={`${style.discussionComment__replyContainer}`}>
            <OutlinedInput
              value={currentReply}
              fullWidth
              multiline
              rows={2}
              onChange={handleReplyChange}
              placeholder="Gửi câu trả lời"
              className={`${style.discussionComment__textbox}`}
            />
            <div className={`${style.discussionComment__buttonContainer}`}>
              <CustomizedButton
                onClick={handleSubmit}
                variant="contained"
                color="primary600"
              >
                Trả lời
              </CustomizedButton>
            </div>
          </div>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default DiscussionComment;
