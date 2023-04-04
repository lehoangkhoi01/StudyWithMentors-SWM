import { useState } from "react";
import style from "./CVSection.module.scss";
import CVModal from "../Modal/CVModal";
import { PROFILE_TITLES } from "../../../../shared/constants/common";

const DUMMY_DATA = [
  {
    title: "Business Analyst tại CodeStringers (09/2010 - Hiện tại)",
    detail:
      "Worem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
  },
  {
    detail:
      "Worem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
  },
];

const CVSection = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const [existedData, setExistedData] = useState(null);

  const onOpenModal = (_, data) => {
    props.reset();

    console.log(data);

    if (data) {
      setExistedData(data);
    }

    setOpenModal(true);
  };

  const onCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <div className={style.section__title}>
        <h3>{props.title}</h3>
        {props.title !== PROFILE_TITLES.INTRODUCION && (
          <>
            <img src={require("../../../../assets/icons/Edit.png")} />
            <img
              onClick={onOpenModal}
              src={require("../../../../assets/icons/Add.png")}
            />
          </>
        )}
        {props.title === PROFILE_TITLES.INTRODUCION && (
          <>
            {DUMMY_DATA.length > 0 && (
              <img
                onClick={(e) => onOpenModal(e, DUMMY_DATA[0])}
                src={require("../../../../assets/icons/Edit.png")}
              />
            )}
            {!DUMMY_DATA.length && (
              <img
                onClick={onOpenModal}
                src={require("../../../../assets/icons/Add.png")}
              />
            )}
          </>
        )}
      </div>
      <div className={style.section__body}>
        {DUMMY_DATA.map((data, index) => (
          <div key={`CV_DETAIL_${index}`}>
            {data.title && <h4>{data.title}</h4>}
            <p>{data.detail}</p>
          </div>
        ))}
      </div>
      <CVModal
        existedData={existedData}
        register={props.register}
        setValue={props.setValue}
        getValues={props.getValues}
        watch={props.watch}
        textFields={props.textFields}
        openModal={openModal}
        onCloseModal={onCloseModal}
        title={props.title}
        handleSubmit={props.handleSubmit}
      />
    </>
  );
};

export default CVSection;
