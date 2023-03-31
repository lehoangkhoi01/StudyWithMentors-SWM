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
        register={props.register}
        setValue={props.setValue}
        watch={props.watch}
        textFields={props.textFields}
        openModal={openModal}
        onCloseModal={onCloseModal}
        title={props.title}
      />
    </>
  );
};

export default CVSection;
