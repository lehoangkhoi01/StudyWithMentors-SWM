import { useDispatch } from "react-redux";
import { helperAction } from "../Store/slices/helperSlice";

export const useCustomCommentList = () => {
  const dispatch = useDispatch();
  const setShouldCommentListRerender = (status) => {
    dispatch(helperAction.setShouldCommentListRerender(status));
  };

  return {
    setShouldCommentListRerender,
  };
};
