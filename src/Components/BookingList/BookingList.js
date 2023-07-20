import React from "react";
import CustomTopTitle from "../../shared/components/CustomTopTitle/CustomTopTitle";
import BookingCard from "./BookingCard/BookingCard";
import style from "./BookingList.module.scss";
import { bookingService } from "../../Services/bookingService";
import BookingInfoDialog from "./BookingInfoDialog/BookingInfoDialog";
import { useCustomLoading, useNotification } from "../../Helpers/generalHelper";
import { ROUTES } from "../../shared/constants/navigation";
import { Box, Tabs, Typography, Tab } from "@mui/material";
import { BOOKING_STATUS } from "../../shared/constants/systemType";
import { COMMON_MESSAGE } from "../../shared/constants/common";
import { styled } from "@mui/material/styles";

const CustomTab = styled(Tab)`
  color: #3948ab;
  &.Mui-selected {
    color: #283493;
  }
`;

const BookingList = () => {
  const [openBookingInfo, setOpenBookingInfo] = React.useState(false);
  const [bookingList, setBookingList] = React.useState([]);
  const [selectedBooking, setSelectedBooking] = React.useState(null);
  const [filterValue, setFilterValue] = React.useState("ALL");

  const { setLoading } = useCustomLoading();
  const { setNotification } = useNotification();

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

  const handleChangeTab = (e, newValue) => {
    setFilterValue(newValue);
  };

  React.useEffect(() => {
    const fetchBooking = async () => {
      setLoading(true);
      try {
        let result = await bookingService.getBooking();
        if (result.bookingCards && result.bookingCards.length > 0) {
          let filteredList = [];
          if (filterValue !== "ALL") {
            filteredList = result.bookingCards.filter(
              (x) => x.status === filterValue
            );
          } else filteredList = result.bookingCards;

          const newResult = processData(filteredList);
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
  }, [filterValue]);

  React.useEffect(() => {
    if (!openBookingInfo) {
      setSelectedBooking(null);
    }
  }, [openBookingInfo]);

  return (
    <div className={`${style.bookingList__container}`}>
      <CustomTopTitle title="Quản lý lịch hẹn" />
      <Box>
        <Tabs
          value={filterValue}
          onChange={handleChangeTab}
          TabIndicatorProps={{ style: { backgroundColor: "#283493" } }}
        >
          <CustomTab label="Tất cả" value="ALL" />
          <CustomTab label="Chờ xác nhận" value={BOOKING_STATUS.REQUESTED} />
          <CustomTab label="Đã xác nhận" value={BOOKING_STATUS.ACCEPTED} />
          <CustomTab label="Đã hủy" value={BOOKING_STATUS.REJECTED} />
        </Tabs>
      </Box>
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

      {selectedBooking && (
        <BookingInfoDialog
          open={openBookingInfo}
          setOpenBookingInfo={setOpenBookingInfo}
          bookingInfo={selectedBooking}
          handleUpdateBookingStatus={handleUpdateBookingStatus}
        />
      )}
    </div>
  );
};

export default BookingList;
