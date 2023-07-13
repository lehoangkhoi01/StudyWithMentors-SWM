import React from "react";
import CustomTopTitle from "../../shared/components/CustomTopTitle/CustomTopTitle";
import BookingCard from "./BookingCard/BookingCard";
import style from "./BookingList.module.scss";
import { bookingService } from "../../Services/bookingService";
import BookingInfoDialog from "./BookingInfoDialog/BookingInfoDialog";

const BookingList = () => {
  const [openBookingInfo, setOpenBookingInfo] = React.useState(false);
  const [bookingList, setBookingList] = React.useState([]);
  const [selectedBooking, setSelectedBooking] = React.useState(null);

  React.useEffect(() => {
    const fetchBookingList = async () => {
      try {
        const result = await bookingService.getBooking();
        console.log(result);
        if (result.bookingCards && result.bookingCards.length > 0) {
          setBookingList(result.bookingCards);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchBookingList();
  }, []);

  return (
    <div className={`${style.bookingList__container}`}>
      <CustomTopTitle title="Quản lý lịch hẹn" />
      <div className={`${style.bookingList__list}`}>
        {bookingList.map((booking, index) => (
          <BookingCard
            key={`booking-cad-${index}`}
            bookingInfo={booking}
            setOpenBookingInfo={setOpenBookingInfo}
            setSelectedBooking={setSelectedBooking}
          />
        ))}
      </div>

      <BookingInfoDialog
        open={openBookingInfo}
        setOpenBookingInfo={setOpenBookingInfo}
        bookingInfo={selectedBooking}
      />
    </div>
  );
};

export default BookingList;
