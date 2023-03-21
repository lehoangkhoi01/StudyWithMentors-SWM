import { useSelector } from "react-redux";
import style from "./LoadingProvider.module.scss";

const LoadingProvider = (props) => {
  const isLoading = useSelector((state) => state.helper.isLoading);

  return (
    <>
      {isLoading && (
        <div className={style.loading__container}>
          <div className={style.loading__item}></div>
        </div>
      )}
      {!isLoading && props.children}
    </>
  );
};

export default LoadingProvider;
