import { Backdrop } from "@mui/material";
import { useSelector } from "react-redux";
import style from "./LoadingProvider.module.scss";

const LoadingProvider = () => {
  const isLoading = useSelector((state) => state.helper.isLoading);

  return (
    <Backdrop className={`${style.backdrop}`} open={isLoading}>
      <div>
        <img alt="logo" src={require("../../../assets/altLogo.png")} />
      </div>
      <div>
        <img
          alt="loading"
          src={require("../../../assets/loading.gif")}
          width={100}
          height={100}
        />
      </div>
    </Backdrop>
  );
};

export default LoadingProvider;
