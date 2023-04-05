import { useState } from "react";
import style from "./CVDetail.module.scss";
import CVModal from "../Modal/CVModal";

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

const CVDetail = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const [existedData, setExistedData] = useState(null);

  const openEditModalHandler = (data) => {
    setExistedData(data);
    setOpenModal(true);
  };

  const onCloseModal = () => {
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
          />
        </div>
        <div>
          <div className={style.detail__title}>
            <h3>{props.title}</h3>
            <img
              src={require("../../../../assets/icons/Add.png")}
              alt="back-icon"
            />
          </div>
          <div className={style.detail__body}>
            {DUMMY_DATA.map((data, index) => (
              <div key={`CV_DETAIL_${index}`}>
                <div className={style.detail__body_header}>
                  <h4>{data.title}</h4>
                  <img
                    onClick={(e) => {
                      openEditModalHandler(e, data);
                    }}
                    src={require("../../../../assets/icons/Edit.png")}
                    alt="back-icon"
                  />
                  <img
                    onClick={props.onBackToList}
                    src={require("../../../../assets/icons/Delete.png")}
                    alt="back-icon"
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
      />
    </>
  );
};

export default CVDetail;
