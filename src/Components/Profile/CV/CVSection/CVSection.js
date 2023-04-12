import { useState } from "react";
import style from "./CVSection.module.scss";
import CVModal from "../Modal/CVModal";
import { PROFILE_TITLES } from "../../../../shared/constants/common";

const CVSection = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const [existedData, setExistedData] = useState(null);

  const onOpenModal = (_, data) => {
    if (data) {
      setExistedData(data);
    }

    setOpenModal(true);
  };

  const onCloseModal = () => {
    setOpenModal(false);
  };

  const onEditData = (data, title, viewData) => {
    props.editDetailData(data, title, viewData);
  };

  return (
    <>
      <div className={style.section__title}>
        <h3>{props.title}</h3>
        {props.title !== PROFILE_TITLES.INTRODUCION && (
          <>
            <img
              onClick={() => {
                onEditData(props.cvData, props.title, props.viewData);
              }}
              src={require("../../../../assets/icons/Edit.png")}
            />
            <img
              onClick={onOpenModal}
              src={require("../../../../assets/icons/Add.png")}
            />
          </>
        )}
        {props.title === PROFILE_TITLES.INTRODUCION && (
          <>
            {props.viewData.length > 0 && (
              <img
                onClick={(e) => onOpenModal(e, props.cvData)}
                src={require("../../../../assets/icons/Edit.png")}
              />
            )}
            {!props.viewData.length && (
              <img
                onClick={onOpenModal}
                src={require("../../../../assets/icons/Add.png")}
              />
            )}
          </>
        )}
      </div>
      <div className={style.section__body}>
        {props.viewData.map((data, index) => {
          return (
            <div key={`CV_DETAIL_${index}`}>
              {data.title && <h4>{data.title}</h4>}
              <p>{data.detail}</p>
            </div>
          );
        })}
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
        reset={props.reset}
      />
    </>
  );
};

export default CVSection;
