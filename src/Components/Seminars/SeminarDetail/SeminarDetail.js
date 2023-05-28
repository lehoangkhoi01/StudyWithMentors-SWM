import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { SEMINAR } from "../../../shared/constants/common";
import style from "./SeminarDetail.module.scss";
import { useEffect, useState } from "react";
import { seminarService } from "../../../Services/seminarService";
import { handleTimeToDisplay } from "../../../Helpers/dateHelper";

const SeminarDetail = () => {
  const [data, setData] = useState();

  const { id } = useParams();

  useEffect(() => {
    try {
      const getSeminarDetail = async () => {
        const seminarDetail = await seminarService.getSeminarDetail(id);

        setData(seminarDetail);
      };

      getSeminarDetail();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className={style.detail__container}>
      <div>Danh sách sự kiện / {data.name}</div>
      <div className={style.detail__content}>
        <img
          className={style.detail__image}
          src={
            data.imageLink
              ? data.imageLink
              : require("../../../assets/default-cover.jpg")
          }
        />
        <div className={style.detail__information}>
          <h1 className={style.detail__title}>{data.name}</h1>
          <p>
            <strong>{SEMINAR.AUTHOR}:</strong>{" "}
            {data.mentors.map(
              (mentor, index) =>
                `${mentor.fullName} ${
                  data.mentors.length - 1 !== index ? "," : ""
                }`
            )}
          </p>
          <p>
            <strong>{SEMINAR.TIME}:</strong>
            {handleTimeToDisplay(data.startTime)}
          </p>
          <p>
            <strong>{SEMINAR.LOCATION}:</strong> {data.location}
          </p>
          <p>
            <strong>{SEMINAR.ORGANIZER}:</strong> {data.organizer}
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
