import { SEMINAR } from "../../../shared/constants/common";
import style from "./SeminarDetail.module.scss";

const SeminarDetail = () => {
  return (
    <div className={style.detail__container}>
      <div>Danh sách sự kiện / Start up 001: How to market research</div>
      <div className={style.detail__content}>
        <img
          className={style.detail__image}
          src={require("../../../assets/Seminar_background.png")}
        />
        <div className={style.detail__information}>
          <h1 className={style.detail__title}>
            Start up 001: How to market research
          </h1>
          <p>
            <strong>{SEMINAR.AUTHOR}:</strong> Paul Kim
          </p>
          <p>
            <strong>{SEMINAR.TIME}:</strong> 9:00, 16.05.2023
          </p>
          <p>
            <strong>{SEMINAR.LOCATION}:</strong> Seminar Room
          </p>
          <p>
            <strong>{SEMINAR.ORGANIZER}:</strong> Phòng Quan hệ Doanh nghiệp
          </p>
          <div>
            <p>
              <strong>{SEMINAR.CONTENT}:</strong>
            </p>
            <ul>
              <li>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industrys standard dummy text
                ever since the 1500s, when an unknown printer took a galley of
                type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </li>
              <li>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industrys standard dummy text
                ever since the 1500s, when an unknown printer took a galley of
                type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </li>
            </ul>
          </div>
          <p>
            <strong>{SEMINAR.ATTACHED_FILE}:</strong>
          </p>
          <ul>
            <li>
              Lorem Ipsum is simply dummy text of the printing and typesetting
            </li>
            <li>
              Lorem Ipsum is simply dummy text of the printing and typesetting
            </li>
            <li>
              Lorem Ipsum is simply dummy text of the printing and typesetting
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SeminarDetail;
