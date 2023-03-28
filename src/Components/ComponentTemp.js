import { useSelector } from "react-redux";
import { selectUserInfo } from "../Store/slices/userSlice";

const ComponentTemp = () => {
  const userInfo = useSelector(selectUserInfo);
  console.log(userInfo);

  return <div>Hello Welcome to Growth Me</div>;
};

export default ComponentTemp;
