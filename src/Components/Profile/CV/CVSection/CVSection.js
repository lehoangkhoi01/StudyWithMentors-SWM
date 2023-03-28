import style from "./CVSection.module.scss";

const CVSection = (props) => {
  return (
    <div className={style.section__title}>
      <h3>{props.title}</h3>
      <img src={require("../../../../assets/icons/Vector.png")} />
    </div>
  );
};

export default CVSection;
