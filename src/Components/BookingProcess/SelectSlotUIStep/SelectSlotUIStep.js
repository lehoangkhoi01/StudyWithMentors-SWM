import React from "react";
import { Typography } from "@mui/material";
import { CustomBigCalendar } from "../../../shared/components/CustomBigCalendar/CustomBigCalendar";
import style from "./SelectSlotUIStep.module.scss";
import {
  getStartEndTime,
  processSchedules,
} from "../../../Helpers/calendarHelper";
import { scheduleService } from "../../../Services/sheduleService";
import { useCustomLoading } from "../../../Helpers/generalHelper";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { ROUTES } from "../../../shared/constants/navigation";

const SelectSlotUIStep = (props) => {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [eventList, setEventList] = React.useState([]);
  const { setLoading } = useCustomLoading();
  const history = useHistory();

  const handleNavigate = async (newDate, view) => {
    setCurrentDate(newDate);
    await triggerRangeChangeEvent(newDate, view);
  };

  const handleSelectEvent = (e) => {
    props.handleSelectSlot(e);
  };

  const triggerRangeChangeEvent = async (date, view) => {
    let toDay = new Date().setHours(0, 0, 0, 0);
    let dateView = new Date(date).setHours(0, 0, 0, 0);
    if (dateView < toDay) {
      setEventList([]);
    } else {
      setLoading(true);
      const startEnd = getStartEndTime(date, view);
      try {
        const result = await scheduleService.getMentorSchedule(
          props.mentorId,
          startEnd.start,
          startEnd.end
        );
        const schedules = processSchedules(result);
        setEventList(schedules);
      } catch (error) {
        history.push(ROUTES.SERVER_ERROR);
      } finally {
        setLoading(false);
      }
    }
  };

  React.useEffect(() => {
    const fetchSchedule = async () => {
      await triggerRangeChangeEvent(currentDate);
    };
    fetchSchedule();
  }, []);

  return (
    <>
      <Typography className={`${style.booking__title}`}>
        Hãy chọn 1 khung giờ cố vấn từ lịch của mentor
      </Typography>
      <div className={`${style.booking__calendar}`}>
        <CustomBigCalendar
          date={currentDate}
          onSelectEvent={handleSelectEvent}
          onNavigate={handleNavigate}
          events={eventList}
        />
      </div>
    </>
  );
};

export default SelectSlotUIStep;
