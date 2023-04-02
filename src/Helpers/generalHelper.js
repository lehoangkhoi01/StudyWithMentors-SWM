import { useDispatch } from "react-redux";
import { helperAction } from "../Store/slices/helperSlice";

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
