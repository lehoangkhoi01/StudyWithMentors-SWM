import React from "react";
import { handleTimeToDisplay } from "../../../Helpers/dateHelper";
import {
  useCustomAppbar,
  useNotification,
} from "../../../Helpers/generalHelper";
import { bookingService } from "../../../Services/bookingService";
import CustomizedTable from "../../../shared/components/Table/CustomizedTable";
import { BOOKING_DETAIL_ACTION } from "../../../shared/constants/actionType";
import {
  ADMIN_BOOKING_TABLE,
  ERROR_MESSAGES,
  TABLE_TYPE,
  TRANSLATED_BOOKING_STATUS,
} from "../../../shared/constants/common";
import BookingInfoDialog from "../BookingInfoDialog/BookingInfoDialog";
import BookingAttendanceDialog from "./BookingAttendanceDialog/BookingAttendanceDialog";
import { APPBAR_TITLES } from "../../../shared/constants/appbarTitles";
import { sortDataByCreatedDate } from "../../../Helpers/arrayHelper";

const AdminBookingList = () => {
  const { setNotification } = useNotification();
  const { setAppbar } = useCustomAppbar();
  setAppbar(APPBAR_TITLES.BOOKING_LIST);
  const [openBookingInfoDialog, setOpenBookingInfoDialog] =
    React.useState(false);

  const [openLogAttendance, setOpenLogAttendance] = React.useState(false);

  const [selectedBooking, setSelectedBooking] = React.useState(null);

  const handleViewDetail = (selectBooking) => {
    setSelectedBooking(selectBooking);
    setOpenBookingInfoDialog(true);
  };

  const handleViewLog = (selectedBooking) => {
    setSelectedBooking(selectedBooking);
    setOpenLogAttendance(true);
  };

  const headerTable = [
    {
      sortable: true,
      property: "topicName",
      name: ADMIN_BOOKING_TABLE.TOPIC_NAME,
    },
    {
      sortable: true,
      property: "mentorName",
      name: ADMIN_BOOKING_TABLE.MENTOR_NAME,
    },
    {
      sortable: true,
      property: "ownerName",
      name: ADMIN_BOOKING_TABLE.PARTICIPANTS,
    },
    {
      sortable: true,
      property: "time",
      name: ADMIN_BOOKING_TABLE.TIME,
    },
    {
      sortable: true,
      property: "translatedStatus",
      name: ADMIN_BOOKING_TABLE.STATUS,
    }
  ];

  const actionItems = [
    {
      imgSrc: require("../../../assets/icons/Edit.png"),
      label: "Xem chi tiết",
      action: BOOKING_DETAIL_ACTION,
      functionAction: function (selectedBooking) {
        handleViewDetail(selectedBooking);
      },
    },
    {
      imgSrc: require("../../../assets/icons/Edit.png"),
      label: "Xem ghi chú tham gia",
      action: BOOKING_DETAIL_ACTION,
      functionAction: function (selectedBooking) {
        handleViewLog(selectedBooking);
      },
    },
  ];

  const getBookings = async () => {
    try {
      const resposne = await bookingService.getBookingAdmin();

      const bookings = resposne.bookingCards;

      const updatedBookings = bookings.map((booking) => ({
        ...booking,
        topicName: booking.topicDetailResponse.name,
        mentorName: booking.mentor.fullName,
        translatedStatus: TRANSLATED_BOOKING_STATUS[booking.status],
        time: handleTimeToDisplay(`${booking.startDate} ${booking.startTime}`),
        defaultTime: `${booking.startDate} ${booking.startTime}`,
        ownerName: booking.owner.fullName,
      }));

      const sortedBookingList = sortDataByCreatedDate(updatedBookings);

      return sortedBookingList;
    } catch (error) {
      setNotification({
        isOpen: true,
        type: "error",
        message: ERROR_MESSAGES.COMMON_ERROR,
      });
    }
  };

  const onSearchBooking = (currentList, searchTerm) => {
    return currentList.filter((booking) =>
      booking.topicName?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <div>
      <CustomizedTable
        type={TABLE_TYPE.BOOKING}
        getData={getBookings}
        filterData={onSearchBooking}
        headerTable={headerTable}
        hideAddingAction={true}
        actionItems={actionItems}
      />

      {openBookingInfoDialog && (
        <BookingInfoDialog
          open={openBookingInfoDialog}
          setOpenBookingInfo={setOpenBookingInfoDialog}
          bookingInfo={selectedBooking}
        />
      )}

      {openLogAttendance && (
        <BookingAttendanceDialog
          open={openLogAttendance}
          setOpenDialog={setOpenLogAttendance}
          bookingId={selectedBooking.id}
        />
      )}
    </div>
  );
};

export default AdminBookingList;
