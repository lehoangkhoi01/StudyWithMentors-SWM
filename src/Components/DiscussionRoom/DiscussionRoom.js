import React from "react";
import { List, Typography, OutlinedInput } from "@mui/material";
import style from "./DiscussionRoom.module.scss";
import CustomizedButton from "../../shared/components/Button/CustomizedButton";
import { addDocument } from "../../firebase/firebaseService";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { format } from "date-fns";
import { DATE_FORMAT } from "../../shared/constants/common";
import DiscussionComment from "./DiscussionComment/DiscussionComment";

const DiscussionRoom = () => {
  const [currentComment, setCurrentComment] = React.useState("");
  const [commentList, setCommentList] = React.useState([]);
  const [replyMap, setReplyMap] = React.useState(new Map());

  const handleUpvoteComment = async (comment, action) => {
    const documentRef = doc(db, "comments", comment.id);
    let updatedData = {};
    if (action === "upvote") {
      updatedData = {
        vote: (comment.vote += 1),
        voteList: comment.voteList
          ? [...comment.voteList, "H8ajNk6j55TLaxbzT1OS"]
          : ["H8ajNk6j55TLaxbzT1OS"],
      };
    } else {
      updatedData = {
        vote: (comment.vote -= 1),
        voteList: comment.voteList.filter((c) => c !== "H8ajNk6j55TLaxbzT1OS"),
      };
    }

    try {
      await updateDoc(documentRef, updatedData);
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeCurrentComment = (e) => {
    if (e.target.value && e.target.value.trim() !== "") {
      setCurrentComment(e.target.value);
    }
  };

  const handleSubmitComment = () => {
    const requestBody = {
      userId: "user1",
      name: "Hoang Khoi",
      avatarUrl:
        "https://th.bing.com/th/id/OIP.Y_4FpCugJav6Gi0FJARFhgHaGN?pid=ImgDet&rs=1",
      message: currentComment,
      vote: 0,
      voteList: [],
      clientTimeStamp: new Date().toString(),
      user: doc(db, "users/H8ajNk6j55TLaxbzT1OS"),
    };
    try {
      addDocument("comments", requestBody);
      setCurrentComment("");
    } catch (error) {
      console.log(error);
    }
  };

  const filterReplies = (comments) => {
    let tempMap = new Map(replyMap);
    comments.forEach((comment) => {
      if (tempMap.get(comment.parentId)) {
        let replies = tempMap.get(comment.parentId);
        replies.push(comment);
        tempMap.set(comment.parentId, replies);
      } else {
        let replies = [comment];
        tempMap.set(comment.parentId, replies);
      }
    });
    setReplyMap(tempMap);
  };

  React.useEffect(() => {
    const collectionRef = collection(db, "comments");
    const orderedQuery = query(
      collectionRef,
      orderBy("serverTimeStamp", "desc")
    );

    onSnapshot(orderedQuery, (querySnapshot) => {
      const promises = [];
      querySnapshot.forEach(async (document) => {
        const userRef = document.data().user;
        const promise = getDoc(userRef);
        promises.push(promise);
      });
      Promise.all(promises)
        .then((userDocs) => {
          const updatedComments = querySnapshot.docs
            .map((change, index) => {
              const commentData = change.data();
              const userData = userDocs[index].exists()
                ? userDocs[index].data()
                : null;
              return {
                id: change.id,
                createdDate: format(
                  commentData.serverTimeStamp.toDate(),
                  DATE_FORMAT.DD_MM_YYYY__HH_mm
                ),
                ...commentData,
                userInfo: userData,
              };
            })
            .filter((comment) => comment !== null);
          filterReplies(updatedComments.filter((comment) => comment.parentId));
          setCommentList(
            updatedComments.filter((comment) => !comment.parentId)
          );
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    });
  }, []);

  return (
    <div className={`${style.discussion__container}`}>
      <div className={`${style.discussion__wrapper}`}>
        <Typography mb={2} variant="h6">
          Thảo luận
        </Typography>

        <div>
          <OutlinedInput
            value={currentComment}
            fullWidth
            multiline
            rows={2}
            onChange={onChangeCurrentComment}
            placeholder="Hãy nhập câu hỏi của bạn"
            className={`${style.discussion__textbox}`}
          />
          <div className={`${style.discussion__buttonContainer}`}>
            <CustomizedButton
              onClick={handleSubmitComment}
              variant="contained"
              color="primary600"
            >
              Gửi câu hỏi
            </CustomizedButton>
          </div>
        </div>

        {commentList.length > 0 ? (
          <List className={`${style.discussion__list}`}>
            {commentList.map((comment) => (
              <DiscussionComment
                key={"discussioncomment" + comment.id}
                comment={comment}
                replies={replyMap.get(comment.id)}
                handleUpvoteComment={handleUpvoteComment}
              />
            ))}
          </List>
        ) : null}
      </div>
    </div>
  );
};

export default DiscussionRoom;
