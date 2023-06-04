import { useDispatch, useSelector } from "react-redux";
import { helperAction } from "../Store/slices/helperSlice";
import { notificationAction } from "../Store/slices/notificationSlice";
import { selectUserInfo, userAction } from "../Store/slices/userSlice";
import { userAccountService } from "../Services/userAccountService";

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
