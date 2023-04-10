import { useEffect, useState } from "react";
import { PROGRESS_INFORMATION_TEXT } from "../../../../shared/constants/common";
import style from "./ProgressImage.module.scss";

const ProgressImage = (props) => {
  const [progressImageNumber, setProgressImageNumber] = useState(1);

  useEffect(() => {
    let numberOfNullCVData = 0;

    Promise.all(
      Object.keys(props.cvData).forEach((key) => {
        if (props.cvData[key] !== null) numberOfNullCVData++;
      })
    ).then(() => {
      setProgressImageNumber(numberOfNullCVData);
    });
  }, [props.cvData]);

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
            <span>{`${PROGRESS_INFORMATION_TEXT.PROGRESS}: ${props.stageOfProgress}/7`}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default ProgressImage;
