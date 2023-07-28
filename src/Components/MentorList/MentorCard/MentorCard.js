import style from "./MentorCard.module.scss";
import { ERROR_MESSAGES, MENTOR_CARD } from "../../../shared/constants/common";
import { Button, IconButton } from "@mui/material";
import { useHistory } from "react-router-dom";
import { ROUTES } from "../../../shared/constants/navigation";
import AddIcon from "@mui/icons-material/Add";
import {
  useCustomLoading,
  useNotification,
} from "../../../Helpers/generalHelper";
// import { followMentorService } from "../../../Services/followMentorService";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../../../Store/slices/userSlice";
import { SYSTEM_ROLE } from "../../../shared/constants/systemType";

const MentorCard = (props) => {
  const history = useHistory();
  const { setNotification } = useNotification();
  const { setLoading } = useCustomLoading();
  const userInfo = useSelector(selectUserInfo);

  const handleNavigateProfile = (id) => {
    history.push(ROUTES.CV + "/" + id);
  };

  const handleFollow = async (mentorId) => {
    try {
      setLoading(true);
      // await followMentorService.follow(mentorId);
      props.onFollowSuccessfully(mentorId);
    } catch (error) {
      setNotification({
        isOpen: true,
        type: "error",
        message: ERROR_MESSAGES.COMMON_ERROR,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUnfollow = async (mentorId) => {
    try {
      setLoading(true);
      // await followMentorService.unfollow(mentorId);
      props.onUnfollowSuccessfully(mentorId);
    } catch (error) {
      setNotification({
        isOpen: true,
        type: "error",
        message: ERROR_MESSAGES.COMMON_ERROR,
      });
    } finally {
      setLoading(false);
    }
  };

  const renderFollowButton = (mentorId) => {
    if (props.followingMentors.includes(mentorId)) {
      return (
        <div className={style.card__follow}>
          <IconButton
            size="small"
            sx={{ color: "white" }}
            onClick={() => handleUnfollow(mentorId)}
          >
            <AddIcon fontSize="small" /> <span>Hủy theo dõi</span>
          </IconButton>
        </div>
      );
    } else {
      return (
        <div className={style.card__follow}>
          <IconButton
            size="small"
            sx={{ color: "white" }}
            onClick={() => handleFollow(mentorId)}
          >
            <AddIcon fontSize="small" /> <span>Theo dõi</span>
          </IconButton>
        </div>
      );
    }
  };

  return (
    <div className={style.card__container}>
      {userInfo.role === SYSTEM_ROLE.STUDENT &&
        renderFollowButton(props.data?.mentorId)}
      {/* <div className={style.card__follow}>
        <IconButton size="small" sx={{ color: "white" }}>
          <AddIcon fontSize="small" /> <span>{FOLLOW.FOLLOW}</span>
        </IconButton>
      </div> */}
      <div className={style.card__cover}>
        <img src={require("../../../assets/Mentor-cover.png")} />
      </div>
      <div className={style.card__avatar}>
        <img
          src={
            props.data.avatarUrl &&
            props.data.avatarUrl !== "avatarUrl" &&
            props.data.avatarUrl !== "string"
              ? props.data.avatarUrl
              : require("../../../assets/Mentor_img.png")
          }
        />
      </div>
      <div className={style.card__information}>
        <div className={style.card__name}>
          <p>
            <Button
              variant="text"
              className={style.card__name}
              onClick={() => handleNavigateProfile(props.data.mentorId)}
            >
              {props.data.fullName}
            </Button>
          </p>
          <p>{props.data.occupation}</p>
        </div>
        <div className={style.card__rating}>
          <div>
            <img
              src={require("../../../assets/icons/Mentor-rating-star.png")}
            />
            <span>
              {props.data.ratingString
                ? props.data.ratingString + "/" + "5.00"
                : "Chưa có đánh giá"}
            </span>
          </div>
          <span>|</span>
          <span>
            {props.data.followers} {MENTOR_CARD.FOLLOWERS}
          </span>
        </div>
        <div className={style.card__topic}>
          {!props.data.topics.length && (
            <div className={style.card__topic_item}>
              <span>{MENTOR_CARD.DONT_HAVE_TOPIC}</span>
            </div>
          )}
          {props.data.topics.map((topic, index) => (
            <>
              {index < 3 && (
                <div
                  key={`MENTOR_ITEM_${index}`}
                  className={style.card__topic_item}
                >
                  <img src={require("../../../assets/icons/mentor-pen.png")} />
                  <span>{topic.name}</span>
                </div>
              )}
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MentorCard;
