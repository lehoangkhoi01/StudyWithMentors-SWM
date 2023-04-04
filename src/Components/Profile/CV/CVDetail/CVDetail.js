import style from "./CVDetail.module.scss";

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
  return (
    <>
      <div className={style.detail__title}>
        <img
          src={require("../../../../assets/icons/Back.png")}
          alt="back-icon"
        />
        <h3>{props.title}</h3>
        <img
          src={require("../../../../assets/icons/Add.png")}
          alt="back-icon"
        />
      </div>
      <div className={style.detail__body}>
        {DUMMY_DATA.map((data, index) => (
          <div key={`CV_DETAIL_${index}`}>
            {data.title && <h4>{data.title}</h4>}
            <p>{data.detail}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default CVDetail;
