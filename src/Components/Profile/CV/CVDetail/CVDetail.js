import { useState } from "react";
import style from "./CVDetail.module.scss";
import CVModal from "../Modal/CVModal";

const CVDetail = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const [existedData, setExistedData] = useState(null);

  const openModalHandler = (_, data) => {
    if (data) {
      setExistedData(data);
    }

    setOpenModal(true);
  };

  const onCloseModal = () => {
    setExistedData(null);
    setOpenModal(false);
  };

  return (
    <>
      <div className={style.detail__container}>
        <div className={style.detail__back}>
          <img
            onClick={props.onBackToList}
            src={require("../../../../assets/icons/Back.png")}
            alt="back-icon"
            className={`${style.detail__img}`}
          />
        </div>
        <div className={style.detail__data}>
          <div className={style.detail__title}>
            <h3>{props.title}</h3>
            <img
              onClick={openModalHandler}
              src={require("../../../../assets/icons/Add.png")}
              alt="back-icon"
              className={`${style.detail__img}`}
            />
          </div>
          <div className={style.detail__body}>
            {props.viewData.map((data, index) => (
              <div key={`CV_DETAIL_${index}`}>
                <div className={style.detail__body_header}>
                  <h4>{data.title}</h4>
                  <img
                    onClick={(e) => {
                      openModalHandler(e, props.data[index]);
                    }}
                    src={require("../../../../assets/icons/Edit.png")}
                    alt="back-icon"
                    className={`${style.detail__img}`}
                  />
                  <img
                    onClick={props.onBackToList}
                    src={require("../../../../assets/icons/Delete.png")}
                    alt="back-icon"
                    className={`${style.detail__img}`}
                  />
                </div>
                <p>{data.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <CVModal
        existedData={existedData}
        register={props.register}
        setValue={props.setValue}
        getValues={props.getValues}
        watch={props.watch}
        textFields={props.selectedTextFields}
        openModal={openModal}
        onCloseModal={onCloseModal}
        title={props.title}
        handleSubmit={props.handleSubmit}
        reset={props.reset}
      />
    </>
  );
};

export default CVDetail;
