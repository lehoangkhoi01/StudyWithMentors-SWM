import { useEffect, useState } from "react";
import { PROGRESS_INFORMATION_TEXT } from "../../../../shared/constants/common";
import style from "./ProgressImage.module.scss";

const ProgressImage = (props) => {
  const [progressImageNumber, setProgressImageNumber] = useState(1);
  const [numberOfEmptyCVData, setNumberOfEmptyCVData] = useState(0);

  useEffect(() => {
    let numberOfNullCVData = 0;

    Object.keys(props.cvData).forEach((key) => {
      if (props.cvData[key].length) numberOfNullCVData++;
    });

    if (numberOfNullCVData < 4) {
      setProgressImageNumber(1);
    } else if (numberOfNullCVData < 6) {
      setProgressImageNumber(2);
    } else if (numberOfNullCVData === 6) {
      setProgressImageNumber(3);
    } else {
      setProgressImageNumber(4);
    }

    setNumberOfEmptyCVData(numberOfNullCVData);
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
            <span>{`${PROGRESS_INFORMATION_TEXT.PROGRESS}: ${numberOfEmptyCVData}/7`}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default ProgressImage;
