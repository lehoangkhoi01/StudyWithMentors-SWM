import { useState } from "react";
import style from "./CVSection.module.scss";
import CVModal from "../Modal/CVModal";

const CVSection = (props) => {
  const [openModal, setOpenModal] = useState(false);

  const onOpenModal = () => {
    setOpenModal(true);
  };

  const onCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <div className={style.section__title}>
        <h3>{props.title}</h3>
        <img
          onClick={onOpenModal}
          src={require("../../../../assets/icons/Vector.png")}
        />
      </div>
      <CVModal
        textFields={props.textFields}
        openModal={openModal}
        onCloseModal={onCloseModal}
        title={props.title}
      />
    </>
  );
};

export default CVSection;
