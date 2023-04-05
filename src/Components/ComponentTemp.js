import { useSelector } from "react-redux";
import { selectUser } from "../Store/slices/userSlice";

const ComponentTemp = () => {
  const userInfo = useSelector(selectUser);
  console.log(userInfo);

  return <div>Hello Welcome to Growth Me</div>;
};

export default ComponentTemp;
