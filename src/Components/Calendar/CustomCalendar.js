import React, { useEffect, useState } from "react";
import "moment/locale/vi";
import { CustomBigCalendar } from "../../shared/components/CustomBigCalendar/CustomBigCalendar";
import MiniCalendar from "./MiniCalendar/MiniCalendar";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import style from "./CustomCalendar.module.scss";
import NoteSection from "./NoteSection/NoteSection";
import ScheduleDialog from "./ScheduleDialog/ScheduleDialog";
import { useCustomLoading, useNotification } from "../../Helpers/generalHelper";
import { scheduleService } from "../../Services/sheduleService";
import { COMMON_MESSAGE } from "../../shared/constants/common";
import EventInfoDialog from "./EventInfoDialog/EventInfoDialog";
import { BOOKING_STATUS } from "../../shared/constants/systemType";
import BookingInfoDialog from "../BookingList/BookingInfoDialog/BookingInfoDialog";
import { ROUTES } from "../../shared/constants/navigation";
import { bookingService } from "../../Services/bookingService";
import { useHistory } from "react-router-dom";
import { getStartEndTime } from "../../Helpers/calendarHelper";

const CustomCalendar = () => {
  const [openScheduleForm, setOpenScheduleForm] = useState(false);
  const [openEventInfoDialog, setOpenEventInfoDialog] = useState(false);
  const [openBookingInfoDialog, setOpenBookingInfoDialog] = useState(false);
  const [eventList, setEventList] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  const { setLoading } = useCustomLoading();
  const { setNotification } = useNotification();
  const history = useHistory();

  const handleCloseScheduleForm = () => {
    setOpenScheduleForm(false);
  };
  const handleOpenScheduleForm = () => {
    setSelectedEvent(null);
    setOpenScheduleForm(true);
  };

  const handleSubmitCreateSchedule = async (newSchedule) => {
    setLoading(true);
    try {
      await scheduleService.createSchedule(newSchedule);
      await triggerRangeChangeEvent(currentDate);
      setNotification({
        isOpen: true,
        type: "success",
        message: COMMON_MESSAGE.ADD_SCHEDULE_SUCCESS,
      });
    } catch (error) {
      setNotification({
        isOpen: true,
        type: "error",
        message: COMMON_MESSAGE.ADD_SCHEDULE_FAIL,
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitUpdateSchedule = async (scheduleId, newSchedule) => {
    setLoading(true);
    console.log(newSchedule);
    try {
      if (!newSchedule.daily && !newSchedule.weekly) {
        const data = {
          parentId: scheduleId,
          exceptionDate: newSchedule.startDate,
          startTime: newSchedule.startTime,
          remove: false,
        };
        await scheduleService.createException(data);
      } else {
        await scheduleService.updateSchedule(scheduleId, newSchedule);
      }

      await triggerRangeChangeEvent(currentDate);
      setNotification({
        isOpen: true,
        type: "success",
        message: COMMON_MESSAGE.UPDATE_SCHEDULE_SUCCESS,
      });
    } catch (error) {
      setNotification({
        isOpen: true,
        type: "error",
        message: COMMON_MESSAGE.UPDATE_SCHEDULE_FAIL,
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectEvent = (e) => {
    if (e.bookingCard) {
      setOpenBookingInfoDialog(true);
    } else {
      setOpenEventInfoDialog(true);
    }
    setSelectedEvent(e);
  };

  const handleRemoveSchedule = async (id, isSingle = false, data) => {
    if (id) {
      setLoading(true);
      try {
        if (isSingle) {
          await scheduleService.createException(data);
        } else {
          await scheduleService.deleteSchedule(id);
        }

        setNotification({
          isOpen: true,
          type: "success",
          message: COMMON_MESSAGE.REMOVE_SCHEDULE_SUCCESS,
        });
        triggerRangeChangeEvent(currentDate);
      } catch (error) {
        setNotification({
          isOpen: true,
          type: "error",
          message: COMMON_MESSAGE.REMOVE_SCHEDULE_FAIL,
        });
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleNavigate = async (newDate, view) => {
    setCurrentDate(newDate);
    await triggerRangeChangeEvent(newDate, view);
  };

  const navigateToDate = async (date) => {
    setCurrentDate(date);
    await triggerRangeChangeEvent(date);
  };

  const processSchedules = (schedules) => {
    let result = [];

    if (schedules && schedules.timeSlots.length > 0) {
      schedules.timeSlots.map((schedule, index) => {
        if (schedule.enable) {
          const newSchedule = {
            id: index,
            exceptionId: schedule.exceptionId,
            scheduleId: schedule.scheduleId,
            title: "Nhận tư vấn",
            start: new Date(schedule.startTime),
            end: new Date(schedule.endTime),
            belongToSeries: schedule.belongToSeries,
          };
          result.push(newSchedule);
        } else if (
          !schedule.enable &&
          schedule.bookStatus !== BOOKING_STATUS.REJECTED
        ) {
          const newSchedule = {
            id: index,
            exceptionId: schedule.exceptionId,
            scheduleId: schedule.scheduleId,
            title:
              schedule.bookStatus === BOOKING_STATUS.REQUESTED
                ? "Chờ xác nhận"
                : "Đã xác nhận",
            start: new Date(schedule.startTime),
            end: new Date(schedule.endTime),
            belongToSeries: schedule.belongToSeries,
            bookingCard: schedule.bookingCard,
            bookStatus: schedule.bookStatus,
          };
          result.push(newSchedule);
        }
      });
    }

    return result;
  };

  const triggerRangeChangeEvent = async (date, view) => {
    setLoading(true);
    const startEnd = getStartEndTime(date, view);
    try {
      const result = await scheduleService.getSchedule(
        startEnd.start,
        startEnd.end
      );
      const schedules = processSchedules(result);
      setEventList(schedules);
    } catch (error) {
      console.log(error);
      if (error?.status == "500") {
        history.push(ROUTES.SERVER_ERROR);
      }
    } finally {
      setLoading(false);
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
      setOpenBookingInfoDialog(false);
      history.push(ROUTES.BOOKING_LIST);
    } catch (error) {
      if (error?.status == "500") {
        history.push(ROUTES.SERVER_ERROR);
      }
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchSchedule = async () => {
      await triggerRangeChangeEvent(currentDate);
    };
    fetchSchedule();
  }, []);

  return (
    <div className={`${style.calendar__page}`}>
      <Grid2 container className={`${style.calendar__container}`}>
        <Grid2 className={`${style.calendar__wrapper}`} xs={4}>
          <MiniCalendar
            handleOpen={handleOpenScheduleForm}
            navigateToDate={navigateToDate}
          />
          <NoteSection />
        </Grid2>
        <Grid2
          className={`${style.calendar__wrapper} ${style.calendar__bigCalendar}`}
          xs={8}
        >
          <CustomBigCalendar
            date={currentDate}
            events={eventList}
            onSelectEvent={handleSelectEvent}
            onNavigate={handleNavigate}
          />
        </Grid2>
      </Grid2>

      {openScheduleForm && (
        <ScheduleDialog
          open={openScheduleForm}
          selectedEvent={selectedEvent}
          startDate={currentDate}
          handleClose={handleCloseScheduleForm}
          handleSubmitCreateSchedule={handleSubmitCreateSchedule}
          isUpdate={false}
        />
      )}

      <EventInfoDialog
        open={openEventInfoDialog}
        handleClose={() => setOpenEventInfoDialog(false)}
        handleRemoveSchedule={handleRemoveSchedule}
        handleSubmitUpdateSchedule={handleSubmitUpdateSchedule}
        event={selectedEvent}
      />

      <BookingInfoDialog
        open={openBookingInfoDialog}
        bookingInfo={selectedEvent?.bookingCard}
        setOpenBookingInfo={setOpenBookingInfoDialog}
        handleUpdateBookingStatus={handleUpdateBookingStatus}
      />
    </div>
  );
};

export default CustomCalendar;
