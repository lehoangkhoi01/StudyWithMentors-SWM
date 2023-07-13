import React from "react";
import CustomTopTitle from "../../shared/components/CustomTopTitle/CustomTopTitle";
import { bookingListData } from "./data";
import BookingCard from "./BookingCard/BookingCard";
import style from "./BookingList.module.scss";

const BookingList = () => {
  return (
    <div className={`${style.bookingList__container}`}>
      <CustomTopTitle title="Quản lý lịch hẹn" />
      <div className={`${style.bookingList__list}`}>
        {bookingListData.map((booking, index) => (
          <BookingCard key={`booking-cad-${index}`} bookingInfo={booking} />
        ))}
      </div>
    </div>
  );
};

export default BookingList;
