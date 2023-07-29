import React from "react";
import style from "./SeminarSection.module.scss";
import { Typography } from "@mui/material";
import { format } from "date-fns";
import { DATE_FORMAT, TITLE } from "../../../../shared/constants/common";
import { SEMINAR_STATUS } from "../../../../shared/constants/systemType";
import { AccountBox, AccessTime, Place, Business } from "@mui/icons-material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { ROUTES_STATIC } from "../../../../shared/constants/navigation";

const SeminarSection = (props) => {
  const history = useHistory();

  const renderSeminarStatusLabel = (status) => {
    if (status === SEMINAR_STATUS.FUTURE) {
      return (
        <div
          className={`${style.seminarSection__seminarStatus} ${style.seminarSection__futureLabel}`}
        >
          {TITLE.SEMINAR_FUTURE}
        </div>
      );
    } else {
      return (
        <div
          className={`${style.seminarSection__seminarStatus} ${style.seminarSection__pastLabel}`}
        >
          {TITLE.SEMINAR_PAST}
        </div>
      );
    }
  };

  const navigateToDetail = (id) => {
    history.push(`${ROUTES_STATIC.SEMINAR_DETAIL}/${id}`);
  };

  return (
    <div className={`${style.seminarSection__container}`}>
      {props.seminars.map((seminar) => (
        <div
          key={`seminarSection__seminar${seminar.id}`}
          className={`${style.seminarSection__seminarCard}`}
          onClick={() => navigateToDetail(seminar.id)}
        >
          <Typography fontWeight={600} variant="h5" color="#283493">
            {seminar.name}
          </Typography>
          {renderSeminarStatusLabel(seminar.status)}

          <Grid2
            container
            spacing={5}
            className={`${style.seminarSection__infoContainer}`}
          >
            <Grid2 xs={6}>
              <div className={`${style.seminarSection__info}`}>
                <AccountBox />
                <Typography>{seminar.speakerList.join(", ")}</Typography>
              </div>
              <div className={`${style.seminarSection__info}`}>
                <AccessTime />
                <Typography>
                  {format(
                    new Date(seminar.startTime),
                    DATE_FORMAT.DD_MM_YYYY__HH_mm
                  )}
                </Typography>
              </div>
            </Grid2>

            <Grid2 xs={6}>
              <div className={`${style.seminarSection__info}`}>
                <Place />
                <Typography>{seminar.location}</Typography>
              </div>
              <div className={`${style.seminarSection__info}`}>
                <Business />
                <Typography>{seminar.department.name}</Typography>
              </div>
            </Grid2>
          </Grid2>
        </div>
      ))}
    </div>
  );
};

export default SeminarSection;
