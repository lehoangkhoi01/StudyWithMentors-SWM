import style from "./MentorCard.module.scss";
import { ERROR_MESSAGES, MENTOR_CARD } from "../../../shared/constants/common";
import { Avatar, IconButton } from "@mui/material";
import { useHistory } from "react-router-dom";
import { ROUTES } from "../../../shared/constants/navigation";
import AddIcon from "@mui/icons-material/Add";
import {
  useCustomLoading,
  useNotification,
} from "../../../Helpers/generalHelper";
import { followMentorService } from "../../../Services/followMentorService";
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
      await followMentorService.follow(mentorId);
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
      await followMentorService.unfollow(mentorId);
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
            disableRipple
            size="small"
            sx={{ color: "#ff6700" }}
            onClick={() => handleUnfollow(mentorId)}
          >
            <AddIcon fontSize="small" /> <span>Đã theo dõi</span>
          </IconButton>
        </div>
      );
    } else {
      return (
        <div className={style.card__follow}>
          <IconButton
            disableRipple
            size="small"
            sx={{ color: "#ff6700" }}
            onClick={() => handleFollow(mentorId)}
          >
            <AddIcon fontSize="small" /> <span>Theo dõi</span>
          </IconButton>
        </div>
      );
    }
  };

  const renderTopicSection = () => {
    if (!props.data?.topics?.length) {
      return (
        <div className={style.card__topic_item}>
          <span>{MENTOR_CARD.DONT_HAVE_TOPIC}</span>
        </div>
      );
    } else {
      return props.data.topics.map((topic, index) => (
        <div key={`MENTOR_ITEM_${index}`}>
          {index < 2 && (
            <div className={style.card__topic_item}>
              <img
                alt="icon"
                src={require("../../../assets/icons/sparkles.png")}
              />
              <span>{topic.name}</span>
            </div>
          )}
        </div>
      ));
    }
  };

  return (
    <div className={style.card__container}>
      {userInfo?.role === SYSTEM_ROLE.STUDENT &&
        renderFollowButton(props.data?.mentorId)}
      {/* <div className={style.card__follow}>
        <IconButton size="small" sx={{ color: "white" }}>
          <AddIcon fontSize="small" /> <span>{FOLLOW.FOLLOW}</span>
        </IconButton>
      </div> */}
      <div className={style.card__avatar}>
        {/* <img
          src={
            props.data.avatarUrl &&
            props.data.avatarUrl !== "avatarUrl" &&
            props.data.avatarUrl !== "string"
              ? props.data.avatarUrl
              : require("../../../assets/sbcf-default-avatar.png")
          }
        /> */}
        <Avatar
          alt={props.data?.name}
          src={
            props.data?.avatarUrl
              ? props.data?.avatarUrl
              : require("../../../assets/sbcf-default-avatar.png")
          }
          sx={{ width: 120, height: 120 }}
        />
      </div>
      <div className={style.card__information}>
        <div className={style.card__name}>
          <div
            // variant="text"
            className={style.card__name__button}
            onClick={() => handleNavigateProfile(props.data.mentorId)}
          >
            {props.data.fullName}
          </div>
          <div className={style.card__name_position}>
            {props.data.occupation}
          </div>
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
        <div className={style.card__topic}>{renderTopicSection()}</div>
      </div>
    </div>
  );
};

export default MentorCard;
