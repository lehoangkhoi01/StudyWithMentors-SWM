import { useState } from "react";
import style from "./CVSection.module.scss";
import CVModal from "../../../Modal/CVModal";
import { PROFILE_TITLES } from "../../../../shared/constants/common";
import { Grid } from "@mui/material";
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";

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
        {props.editable && props.title !== PROFILE_TITLES.INTRODUCION && (
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
        {props.editable && props.title === PROFILE_TITLES.INTRODUCION && (
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
              <div
                key={`CV_DETAIL_${index}`}
                className={`${style.section__detailWrapper}`}
              >
                {data.title && (
                  <h4>
                    <SubdirectoryArrowRightIcon />
                    {data.title}
                  </h4>
                )}
                <div style={{ display: "flex", alignItems: "baseline" }}>
                  <SubdirectoryArrowRightIcon sx={{ visibility: "hidden" }} />{" "}
                  <div className={`${style.section__detailWrapper_data}`}>
                    {data.detail}
                  </div>
                </div>
              </div>
            );
          })}

        {props.title === PROFILE_TITLES.SKILLS && (
          <Grid container spacing={2}>
            {props.viewData.map((data, index) => {
              return (
                <Grid key={`CV_DETAIL_${index}`} item xs={6}>
                  <div className={`${style.section__detailWrapper}`}>
                    {data.title && (
                      <h4>
                        <SubdirectoryArrowRightIcon />
                        {data.title}
                      </h4>
                    )}
                    <div style={{ display: "flex", alignItems: "baseline" }}>
                      <SubdirectoryArrowRightIcon
                        sx={{ visibility: "hidden" }}
                      />{" "}
                      <div className={`${style.section__detailWrapper_data}`}>
                        {data.detail}
                      </div>
                    </div>
                  </div>
                </Grid>
              );
            })}
          </Grid>
        )}
      </div>
      <CVModal
        existedData={existedData}
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
