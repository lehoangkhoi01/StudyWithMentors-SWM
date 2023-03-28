import { useEffect, useState } from "react";
import { PROGRESS_INFORMATION_TEXT } from "../../../../shared/constants/common";
import style from "./ProgressImage.module.scss";

const STAGE = 4;

const ProgressImage = () => {
  const [progressImageNumber, setProgressImageNumber] = useState(1);

  useEffect(() => {
    if (STAGE < 4) {
      setProgressImageNumber(1);
    } else if (STAGE < 6) {
      setProgressImageNumber(2);
    } else if (STAGE < 7) {
      setProgressImageNumber(3);
    } else {
      setProgressImageNumber(4);
    }
  }, []);

  return (
    <>
      {progressImageNumber !== 4 && (
        <div className={style.progress__container}>
          <div className={style.progress__image}>
            <img
              src={require(`../../../../assets/information-progress/stage-${progressImageNumber}.png`)}
              alt="progress"
            />
          </div>
          <div className={style.progress__text}>
            <span>{PROGRESS_INFORMATION_TEXT.NEED_UPDATE_INFORMATION}</span>
            <span>{PROGRESS_INFORMATION_TEXT.MORE_COMPLETE}</span>
            <span>{`${PROGRESS_INFORMATION_TEXT.PROGRESS}: ${STAGE}/7`}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default ProgressImage;
