import { useDispatch, useSelector } from "react-redux";
import { helperAction } from "../Store/slices/helperSlice";
import { notificationAction } from "../Store/slices/notificationSlice";
import { selectUserInfo, userAction } from "../Store/slices/userSlice";
import { userAccountService } from "../Services/userAccountService";
import { mentorAcion, selectMentorList } from "../Store/slices/mentorSlice";
import { accountService } from "../Services/accountService";
import {
  selectTopicCategories,
  selectTopicFields,
  topicAction,
} from "../Store/slices/topicSlice";
import { topicService } from "../Services/topicService";
import {
  departmentAction,
  selectDepartments,
} from "../Store/slices/departmentSlice";
import { departmentService } from "../Services/departmentService";
import { sortDataByCreatedDate } from "./arrayHelper";

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
        dispatch(userAction.setFirstFetch());
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
        if (mentorList.length > 0) {
          mentorList = sortDataByCreatedDate(mentorList);
        }
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
      if (mentorList.length > 0) {
        mentorList = sortDataByCreatedDate(mentorList);
      }
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

export const useFetchTopicFieldsAndCategories = () => {
  const dispatch = useDispatch();
  let topicFields = useSelector(selectTopicFields);
  let topicCategories = useSelector(selectTopicCategories);

  const getTopicFields = async () => {
    if (!topicFields || topicFields.length === 0) {
      try {
        topicFields = await topicService.getFields();
        dispatch(topicAction.setTopicFields(topicFields));
      } catch (error) {
        console.log(error);
      }
    }
    return topicFields;
  };

  const getTopicCategories = async () => {
    if (!topicCategories || topicCategories.length === 0) {
      try {
        topicCategories = await topicService.getCategories();
        dispatch(topicAction.setTopicCategories(topicCategories));
      } catch (error) {
        console.log(error);
      }
    }
    return topicCategories;
  };
  return {
    getTopicFields,
    getTopicCategories,
  };
};

export const useFetchDepartments = () => {
  const dispatch = useDispatch();
  let departments = useSelector(selectDepartments);

  const getDepartments = async () => {
    if (!departments || departments.length === 0) {
      try {
        departments = await departmentService.getDepartments();
        dispatch(departmentAction.setDepartments(departments));
      } catch (error) {
        console.log(error);
      }
    }
    return departments;
  };

  return { getDepartments };
};
