import { useDispatch, useSelector } from "react-redux";
import { helperAction } from "../Store/slices/helperSlice";
import { notificationAction } from "../Store/slices/notificationSlice";
import { selectUserInfo, userAction } from "../Store/slices/userSlice";
import { userAccountService } from "../Services/userAccountService";
import { mentorAcion, selectMentorList } from "../Store/slices/mentorSlice";
import { accountService } from "../Services/accountService";

// reason: want to specify delay time for loading for smoothier
export const useCustomLoading = () => {
  const dispatch = useDispatch();
  const setLoading = (isLoading) => {
    setTimeout(() => {
      dispatch(helperAction.setLoading(isLoading));
    }, 300);
  };
  return {
    setLoading,
  };
};

export const useCustomAppbar = () => {
  const dispatch = useDispatch();
  const setAppbar = (title) => {
    dispatch(helperAction.setAppbarTitle(title));
  };
  return {
    setAppbar,
  };
};

export const useNotification = () => {
  const dispatch = useDispatch();
  const setNotification = (noti) => {
    dispatch(notificationAction.setNotification(noti));
  };
  const setNotiOpen = (isOpen) => {
    dispatch(notificationAction.setOpen(isOpen));
  };

  return {
    setNotification,
    setNotiOpen,
  };
};

export const useFetchUserInfo = () => {
  const dispatch = useDispatch();
  let userInfo = useSelector(selectUserInfo);
  const token = localStorage.getItem("TOKEN");
  const getUserInfo = async () => {
    if (!userInfo && token) {
      try {
        userInfo = await userAccountService.getUserInfo();
        dispatch(userAction.setUserInfo(userInfo));
      } catch (error) {
        console.log(error);
      }
    }
    return userInfo;
  };

  return {
    getUserInfo,
  };
};

export const useFetchSpeakerList = () => {
  const dispatch = useDispatch();
  let mentorList = useSelector(selectMentorList);

  const getSpeakerList = async () => {
    if (!mentorList || mentorList.length === 0) {
      try {
        mentorList = await accountService.getAllMentors();
        dispatch(mentorAcion.setMentorList(mentorList));
      } catch (error) {
        console.log(error);
      }
    }
    return mentorList;
  };

  const getLatestSpeakerList = async () => {
    try {
      mentorList = await accountService.getAllMentors();
      dispatch(mentorAcion.setMentorList(mentorList));
    } catch (error) {
      console.log(error);
    }
    return mentorList;
  };
  return {
    getLatestSpeakerList,
    getSpeakerList,
  };
};
