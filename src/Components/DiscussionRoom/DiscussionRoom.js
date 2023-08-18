import React from "react";
import {
  List,
  Typography,
  OutlinedInput,
  IconButton,
  Tooltip,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import style from "./DiscussionRoom.module.scss";
import CustomizedButton from "../../shared/components/Button/CustomizedButton";
import { addDocument, updateDocument } from "../../firebase/firebaseService";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { format } from "date-fns";
import { DATE_FORMAT, ERROR_MESSAGES } from "../../shared/constants/common";
import DiscussionComment from "./DiscussionComment/DiscussionComment";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../../Store/slices/userSlice";
import { useNotification } from "../../Helpers/generalHelper";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { ROUTES } from "../../shared/constants/navigation";

const DiscussionRoom = (props) => {
  const [sortByDate, setSortByDate] = React.useState(true);
  const [currentComment, setCurrentComment] = React.useState("");
  const [commentList, setCommentList] = React.useState([]);
  const [replyMap, setReplyMap] = React.useState(new Map());
  const [allComments, setAllComments] = React.useState([]);
  localStorage.setItem("SHOULD_RERENDER_COMMENT", "true");
  const [shoudlRerender, setShouldRerender] = React.useState(true);
  const userInfo = useSelector(selectUserInfo);

  const { setNotification } = useNotification();
  const history = useHistory();

  const updateLocalStorage = (value) => {
    localStorage.setItem("SHOULD_RERENDER_COMMENT", value);
    setShouldRerender(false);
  };

  const handleUpvoteComment = async (comment, action) => {
    let updatedData = {};
    if (action === "upvote") {
      updatedData = {
        vote: (comment.vote += 1),
        voteList: comment.voteList
          ? [...comment.voteList, userInfo?.accountId]
          : [userInfo?.accountId],
      };
    } else {
      // if (comment.vote === 0) return;
      updatedData = {
        vote: (comment.vote -= 1),
        voteList: comment.voteList.filter((c) => c !== userInfo?.accountId),
      };
    }

    try {
      await updateDocument("Comments", comment.id, updatedData);
    } catch (error) {
      console.log(error);
      setNotification({
        isOpen: true,
        type: "error",
        message: ERROR_MESSAGES.UPVOTE_ERROR,
      });
    }
  };

  const onChangeCurrentComment = (e) => {
    setCurrentComment(e.target.value);
  };

  const handleSubmitComment = () => {
    if (currentComment.trim()) {
      const requestBody = {
        seminarId: props.seminarId,
        message: currentComment.trim(),
        vote: 0,
        voteList: [],
        user: doc(db, "Users/" + userInfo?.accountId),
      };

      try {
        addDocument("Comments", requestBody);
        setCurrentComment("");
      } catch (error) {
        setNotification({
          isOpen: true,
          type: "error",
          message: ERROR_MESSAGES.COMMENT_ERROR,
        });
      }
    }
  };

  const filterReplies = (comments) => {
    let tempMap = new Map();
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
    let detach = null;
    const collectionRef = collection(db, "Comments");
    const orderedQuery = query(
      collectionRef,
      where("seminarId", "==", props.seminarId),
      orderBy("serverTimeStamp", "desc")
    );
    if (shoudlRerender) {
      detach = onSnapshot(orderedQuery, (querySnapshot) => {
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
            if (localStorage.getItem("SHOULD_RERENDER_COMMENT") === "true") {
              setAllComments(updatedComments);
              filterReplies(
                updatedComments.filter((comment) => comment.parentId)
              );
              setCommentList(
                updatedComments.filter((comment) => !comment.parentId)
              );
            }
          })
          .catch(() => {
            history.push(ROUTES.SERVER_ERROR);
          });
      });
    }

    return () => {
      if (!shoudlRerender) {
        if (typeof detach === "function") {
          detach();
        }
      }
    };
  }, [shoudlRerender]);

  React.useEffect(() => {
    if (commentList.length > 0) {
      let temp = [...allComments];
      if (!sortByDate) {
        temp.sort((a, b) => b.vote - a.vote);
        setCommentList(temp.filter((comment) => !comment.parentId));
        filterReplies(temp.filter((comment) => comment.parentId));
      } else {
        temp.sort((a, b) => b.serverTimeStamp - a.serverTimeStamp);
        setCommentList(temp.filter((comment) => !comment.parentId));
        filterReplies(temp.filter((comment) => comment.parentId));
      }
    }
  }, [sortByDate]);

  return (
    <div className={`${style.discussion__container}`}>
      <div className={`${style.discussion__wrapper}`}>
        <div className={`${style.discussion__heading}`}>
          <Typography mb={2} variant="h6">
            Hỏi và giải đáp ({commentList.length})
          </Typography>

          <Tooltip
            title={
              sortByDate ? "Sắp xếp theo lượt thích" : "Sắp xếp theo giờ đăng"
            }
          >
            <IconButton
              onClick={() => {
                setSortByDate((prev) => !prev);
              }}
              className={sortByDate ? `${style.discussion__active}` : null}
            >
              <FilterListIcon />
            </IconButton>
          </Tooltip>
          {/* <IconButton
            onClick={() => {
              setSortByDate((prev) => !prev);
            }}
            className={sortByDate ? `${style.discussion__active}` : null}
          >
            <FilterListIcon />
          </IconButton> */}
        </div>

        {userInfo && (
          <div>
            <OutlinedInput
              value={currentComment}
              fullWidth
              multiline
              rows={2}
              onChange={onChangeCurrentComment}
              placeholder="Gửi câu hỏi của bạn để được giải đáp"
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
        )}

        {commentList.length > 0 ? (
          <List className={`${style.discussion__list}`}>
            {commentList.map((comment) => (
              <DiscussionComment
                key={"discussioncomment" + comment.id}
                seminarId={props.seminarId}
                comment={comment}
                replies={replyMap.get(comment.id)}
                handleUpvoteComment={handleUpvoteComment}
                updateLocalStorage={updateLocalStorage}
              />
            ))}
          </List>
        ) : null}
      </div>
    </div>
  );
};

export default DiscussionRoom;
