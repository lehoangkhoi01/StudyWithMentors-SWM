import React from "react";
import CustomTopTitle from "../../shared/components/CustomTopTitle/CustomTopTitle";
import BookingCard from "./BookingCard/BookingCard";
import style from "./BookingList.module.scss";
import { bookingService } from "../../Services/bookingService";
import BookingInfoDialog from "./BookingInfoDialog/BookingInfoDialog";
import { useCustomLoading } from "../../Helpers/generalHelper";
import { useHistory } from "react-router-dom";
import { ROUTES } from "../../shared/constants/navigation";

const BookingList = () => {
  const [openBookingInfo, setOpenBookingInfo] = React.useState(false);
  const [bookingList, setBookingList] = React.useState([]);
  const [selectedBooking, setSelectedBooking] = React.useState(null);
  const { setLoading } = useCustomLoading();
  const history = useHistory();

  const fetchBookingList = async () => {
    try {
      const result = await bookingService.getBooking();
      console.log(result);
      if (result.bookingCards && result.bookingCards.length > 0) {
        setBookingList(result.bookingCards);
      }
    } catch (error) {
      if (error?.status == "500") {
        history.push(ROUTES.SERVER_ERROR);
      }
      console.log(error);
    }
  };

  const handleApproveBooking = async (data) => {
    setLoading(true);
    console.log(data);
    await bookingService.updateBookingStatus(data);
    setOpenBookingInfo(false);
    await fetchBookingList();
    setLoading(false);
  };

  React.useEffect(() => {
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
        handleApproveBooking={handleApproveBooking}
      />
    </div>
  );
};

export default BookingList;
