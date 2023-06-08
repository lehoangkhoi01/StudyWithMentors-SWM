import React from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  //Typography,
  // Divider,
  Typography,
  //TextField,
  OutlinedInput,
} from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import style from "./DiscussionRoom.module.scss";
//import { comments } from "./discussionData";
import CustomizedButton from "../../shared/components/Button/CustomizedButton";
import { addDocument } from "../../firebase/firebaseService";
import { collection, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { format } from "date-fns";
import { DATE_FORMAT } from "../../shared/constants/common";

const DiscussionRoom = () => {
  const [currentComment, setCurrentComment] = React.useState("");
  const [commentList, setCommentList] = React.useState([]);
  //const [commentMap, setCommentMap] = React.useState();

  const renderUpvoteSection = (vote) => {
    return (
      <div className={`${style.discussion__upvoteContainer}`}>
        <ArrowDropUpIcon
          className={`${style.discussion__upvoteContainer__icon}`}
        />
        {vote}
      </div>
    );
  };

  // const renderComments = React.useCallback(() => {
  //   console.log(commentList);
  //   if (commentList.length > 0) {
  //     return commentList.map((comment, index) => {
  //       return (
  //         <>
  //           <ListItem
  //             key={`comment${comment.id}`}
  //             alignItems="flex-start"
  //             secondaryAction={renderUpvoteSection(comment.vote)}
  //           >
  //             <ListItemAvatar>
  //               <Avatar alt={comment.userInfo?.name} src={comment.avatar} />
  //             </ListItemAvatar>
  //             <ListItemText
  //               primary={comment.message}
  //               secondary={
  //                 <React.Fragment>
  //                   {comment.userInfo?.name} {comment.createdDate}
  //                 </React.Fragment>
  //               }
  //             />
  //           </ListItem>
  //           {index === commentList.length - 1 ? null : (
  //             <Divider variant="inset" component="li" />
  //           )}
  //         </>
  //       );
  //     });
  //   } else return null;
  // }, [commentList]);

  const onChangeCurrentComment = (e) => {
    if (e.target.value && e.target.value.trim() !== "") {
      console.log(e.target.value);
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
      vote: 5,
      clientTimeStamp: new Date().toString(),
    };
    try {
      addDocument("comments", requestBody);
      setCurrentComment("");
    } catch (error) {
      console.log(error);
    }
    console.log(requestBody);
  };

  React.useEffect(() => {
    onSnapshot(collection(db, "comments"), (querySnapshot) => {
      const promises = [];
      querySnapshot.forEach(async (document) => {
        let userComment = {
          id: document.id,
          createdDate: format(
            document.data().serverTimeStamp.toDate(),
            DATE_FORMAT.DD_MM_YYYY__HH_mm
          ),
          ...document.data(),
        };
        const userRef = userComment.user;
        const promise = getDoc(userRef);
        promises.push(promise);
      });
      Promise.all(promises)
        .then((userDocs) => {
          console.log(querySnapshot.docs);
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

          setCommentList(updatedComments);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    });
  }, []);

  React.useEffect(() => {
    console.log(commentList);
  }, [commentList]);

  return (
    <div className={`${style.discussion__container}`}>
      <div className={`${style.discussion__wrapper}`}>
        <Typography mb={2} variant="h6">
          Thảo luận
        </Typography>
        <Typography>{currentComment}</Typography>
        <div>
          <OutlinedInput
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
              <ListItem
                key={`comment${comment.id}`}
                alignItems="flex-start"
                secondaryAction={renderUpvoteSection(comment.vote)}
              >
                <ListItemAvatar>
                  <Avatar
                    alt={comment.userInfo?.name}
                    src={comment.userInfo?.avatarUrl}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={comment.message}
                  secondary={
                    <React.Fragment>
                      {comment.userInfo?.name} {comment.createdDate}
                    </React.Fragment>
                  }
                />
              </ListItem>
            ))}
          </List>
        ) : null}
      </div>
    </div>
  );
};

export default DiscussionRoom;
