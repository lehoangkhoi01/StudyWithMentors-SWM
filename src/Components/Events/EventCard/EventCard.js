import style from "./EventCard.module.scss";
import CustomizedButton from "../../../shared/components/Button/CustomizedButton";

const EventCard = (props) => {
  return (
    <div className={style.card__container}>
      <img className={style.card__image} src="https://artinmindstudio.com/wp-content/uploads/2022/03/Sunflower-Hope.jpg" />
      <div>
        <h1>{props.data.title}</h1>
        <p>Diễn giả: {props.data.author}</p>
        <p>Tại {props.data.location}</p>
        <p>Tổ chức bởi: {props.data.organizer}</p>
        <p>{props.data.status}</p>
        <CustomizedButton type="submit" variant="contained" color="primary600">
          Quan tâm
        </CustomizedButton>
      </div>
    </div>
  );
};

export default EventCard;
