import { handleTimeToDisplay } from "../../../Helpers/dateHelper";
import { useNotification } from "../../../Helpers/generalHelper";
import { bookingService } from "../../../Services/bookingService";
import CustomizedTable from "../../../shared/components/Table/CustomizedTable";
import {
  ADMIN_BOOKING_TABLE,
  ERROR_MESSAGES,
  TABLE_TYPE,
} from "../../../shared/constants/common";
import { BOOKING_STATUS } from "../../../shared/constants/systemType";

const AdminBookingList = () => {
  const { setNotification } = useNotification();

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
      property: "participants",
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
    },
    {
      sortable: true,
      property: "bookingTime",
      name: ADMIN_BOOKING_TABLE.BOOKING_DATE,
    },
  ];

  const actionItems = [];

  const getBookings = async () => {
    try {
      const resposne = await bookingService.getBooking();

      const bookings = resposne.bookingCards;

      const updatedBookings = bookings.map((booking) => ({
        ...booking,
        topicName: booking.topicDetailResponse.name,
        mentorName: booking.mentor.fullName,
        participants: booking.mentees.map((mentee) => mentee.fullName),
        translatedStatus: BOOKING_STATUS[booking.status],
        time: handleTimeToDisplay(`${booking.startDate} ${booking.startTime}`),
        bookingTime: handleTimeToDisplay(booking.createdDate),
      }));

      return updatedBookings;
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
      booking.topicName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <div>
      <CustomizedTable
        type={TABLE_TYPE.BOOKING}
        getData={getBookings}
        filterData={onSearchBooking}
        headerTable={headerTable}
        actionItems={actionItems}
        hideAddingAction={true}
      />
    </div>
  );
};

export default AdminBookingList;
