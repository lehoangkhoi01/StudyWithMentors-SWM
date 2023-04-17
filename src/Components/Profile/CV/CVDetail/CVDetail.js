import { useState } from "react";
import style from "./CVDetail.module.scss";
import CVModal from "../Modal/CVModal";
import DeletePropertyModal from "../Modal/DeletePropertyModal";

const CVDetail = (props) => {
  const [openModal, setOpenModal] = useState({
    upsert: false,
    delete: false,
  });
  const [existedData, setExistedData] = useState(null);
  const [deletedIndex, setDeletedIndex] = useState(-1);

  const openModalHandler = (_, data) => {
    if (data) {
      setExistedData(data);
    }

    setOpenModal({
      upsert: true,
      delete: false,
    });
  };

  const openDeleteModalHandler = (index) => {
    setDeletedIndex(index);
    setOpenModal({
      upsert: false,
      delete: true,
    });
  };

  const onCloseModal = () => {
    setExistedData(null);
    setOpenModal({
      upsert: false,
      delete: false,
    });
    setDeletedIndex(-1);
  };

  const onDeleteProperty = () => {
    props.onDeleteProperty(props.title, deletedIndex);
    setOpenModal({
      upsert: false,
      delete: false,
    });
    setDeletedIndex(-1);
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
                    onClick={() => {
                      openDeleteModalHandler(index);
                    }}
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
        openModal={openModal.upsert}
        onCloseModal={onCloseModal}
        title={props.title}
        handleSubmit={props.handleSubmit}
        reset={props.reset}
        errors={props.errors}
      />
      <DeletePropertyModal
        openModal={openModal.delete}
        onCloseModal={onCloseModal}
        title={props.title}
        onDeleteProperty={onDeleteProperty}
      />
    </>
  );
};

export default CVDetail;
