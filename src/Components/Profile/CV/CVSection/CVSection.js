import { useState } from "react";
import style from "./CVSection.module.scss";
import CVModal from "../Modal/CVModal";
import { PROFILE_TITLES } from "../../../../shared/constants/common";
import { Grid } from "@mui/material";

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
    setExistedData(null);
    setOpenModal(false);
  };

  const onEditData = () => {
    props.editDetailData(props.keyProperty, props.title, props.indexOfProperty);
  };

  return (
    <>
      <div className={style.section__title}>
        <h3>{props.title}</h3>
        {props.title !== PROFILE_TITLES.INTRODUCION && (
          <>
            <img
              onClick={onEditData}
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
        {props.title !== PROFILE_TITLES.SKILLS &&
          props.viewData.map((data, index) => {
            return (
              <div key={`CV_DETAIL_${index}`}>
                {data.title && <h4>{data.title}</h4>}
                <p>{data.detail}</p>
              </div>
            );
          })}

        {props.title === PROFILE_TITLES.SKILLS && (
          <Grid container spacing={2}>
            {props.viewData.map((data, index) => {
              return (
                <Grid key={`CV_DETAIL_${index}`} item xs={6}>
                  <div>
                    {data.title && <h4>{data.title}</h4>}
                    <p>{data.detail}</p>
                  </div>
                </Grid>
              );
            })}
          </Grid>
        )}
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
