import React from "react";
import CustomTopTitle from "../../shared/components/CustomTopTitle/CustomTopTitle";
import BookingCard from "./BookingCard/BookingCard";
import style from "./BookingList.module.scss";
import { bookingService } from "../../Services/bookingService";
import BookingInfoDialog from "./BookingInfoDialog/BookingInfoDialog";
import { useCustomLoading, useNotification } from "../../Helpers/generalHelper";
import { useHistory } from "react-router-dom";
import { ROUTES } from "../../shared/constants/navigation";
import { Typography } from "@mui/material";

const BookingList = () => {
  const [openBookingInfo, setOpenBookingInfo] = React.useState(false);
  const [bookingList, setBookingList] = React.useState([]);
  const [selectedBooking, setSelectedBooking] = React.useState(null);
  const { setLoading } = useCustomLoading();
  const { setNotification } = useNotification();
  const history = useHistory();

  const fetchBookingList = async () => {
    const result = await bookingService.getBooking();
    if (result.bookingCards && result.bookingCards.length > 0) {
      setBookingList(result.bookingCards);
    }
  };

  const handleApproveBooking = async (data) => {
    try {
      setLoading(true);
      console.log(data);
      await bookingService.updateBookingStatus(data);
      setNotification({
        isOpen: true,
        type: "success",
        message: "Xác nhận lịch thành công",
      });
      setOpenBookingInfo(false);
      await fetchBookingList();
    } catch (error) {
      if (error?.status == "500") {
        history.push(ROUTES.SERVER_ERROR);
      }
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    const fetchBooking = async () => {
      setLoading(true);
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
      } finally {
        setLoading(false);
      }
    };
    fetchBooking();
  }, []);

  return (
    <div className={`${style.bookingList__container}`}>
      <CustomTopTitle title="Quản lý lịch hẹn" />
      <div className={`${style.bookingList__list}`}>
        {bookingList.length > 0 ? (
          bookingList.map((booking, index) => (
            <BookingCard
              key={`booking-cad-${index}`}
              bookingInfo={booking}
              setOpenBookingInfo={setOpenBookingInfo}
              setSelectedBooking={setSelectedBooking}
            />
          ))
        ) : (
          <Typography variant="h6" textAlign="center">
            Chưa có dữ liệu
          </Typography>
        )}
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
