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
import { BOOKING_STATUS } from "../../shared/constants/systemType";
import { COMMON_MESSAGE } from "../../shared/constants/common";

const BookingList = () => {
  const [openBookingInfo, setOpenBookingInfo] = React.useState(false);
  const [bookingList, setBookingList] = React.useState([]);
  const [selectedBooking, setSelectedBooking] = React.useState(null);
  const { setLoading } = useCustomLoading();
  const { setNotification } = useNotification();
  const history = useHistory();

  const processData = (data) => {
    let newData = data.map((el) => {
      return { ...el, convertedCreateDate: new Date(el.createdDate) };
    });
    newData.sort((a, b) => b.convertedCreateDate - a.convertedCreateDate);
    return newData;
  };

  const fetchBookingList = async () => {
    const result = await bookingService.getBooking();
    if (result.bookingCards && result.bookingCards.length > 0) {
      const newResult = processData(result.bookingCards);
      setBookingList(newResult);
    }
  };

  const handleUpdateBookingStatus = async (data, status) => {
    try {
      setLoading(true);
      await bookingService.updateBookingStatus(data);
      setNotification({
        isOpen: true,
        type: "success",
        message:
          status === BOOKING_STATUS.ACCEPTED
            ? COMMON_MESSAGE.ACCEPT_BOOKING_SUCCESS
            : COMMON_MESSAGE.REJECT_BOOKING_SUCCESS,
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
        let result = await bookingService.getBooking();
        if (result.bookingCards && result.bookingCards.length > 0) {
          result.bookingCards.sort((a, b) => a.createdDate - b.createdDate);
          const newResult = processData(result.bookingCards);
          setBookingList(newResult);
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
        {bookingList?.length > 0 ? (
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
        handleUpdateBookingStatus={handleUpdateBookingStatus}
      />
    </div>
  );
};

export default BookingList;
