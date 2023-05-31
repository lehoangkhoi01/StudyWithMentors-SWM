import style from "./SeminarList.module.scss";
import { useEffect, useState } from "react";
import SeminarCard from "../SeminarCard/SeminarCard";
import { seminarService } from "../../../Services/seminarService";
import { Grid } from "@mui/material";
import SeminarFilter from "./SeminarFilter/SeminarFilter";
import CustomizedButton from "../../../shared/components/Button/CustomizedButton";
import { BUTTON_LABEL, FILTER_SEMINAR } from "../../../shared/constants/common";
import { useCustomLoading } from "../../../Helpers/generalHelper";

const SeminarList = () => {
  const [seminars, setSeminars] = useState([]);
  const [statusFilter, setStatusFilter] = useState(FILTER_SEMINAR.ALL);
  const [filterInfo, setFilterInfo] = useState();
  const [nextLink, setNextLink] = useState();

  const { setLoading } = useCustomLoading();

  useEffect(() => {
    console.log("First load");
    getSeminarList();
  }, []);

  useEffect(() => {
    getSeminarList();
  }, [filterInfo]);

  const onChangeStatusFilter = (status) => {
    setStatusFilter(status);
  };

  const getSeminarList = async (url) => {
    try {
      setLoading(true);
      const clearedFilterInfo = filterInfo
        ? Object.fromEntries(Object.entries(filterInfo).filter(([, v]) => !!v))
        : filterInfo;

      const response = await seminarService.getSemniars(clearedFilterInfo, url);

      const data = url ? [...seminars, ...response.content] : response.content;

      setSeminars(data);
      setNextLink(response.nextPage);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onSeminarFilter = (seminarName, startDate, endDate, departmentId) => {
    setFilterInfo({
      searchString: seminarName,
      startDate,
      endDate,
      departmentId,
    });
  };

  const viewMoreSeminar = () => {
    getSeminarList(nextLink);
  };

  return (
    <div>
      <SeminarFilter onSeminarFilter={onSeminarFilter} />
      <div className={style.seminarList__status__filter}>
        <div className={style.seminarList__status__filter__items}>
          <p
            className={
              statusFilter === FILTER_SEMINAR.ALL
                ? style.seminarList__status__filter__active
                : ""
            }
            onClick={() => {
              onChangeStatusFilter(FILTER_SEMINAR.ALL);
            }}
          >
            {FILTER_SEMINAR.ALL}
          </p>
          <p
            className={
              statusFilter === FILTER_SEMINAR.IS_COMMING
                ? style.seminarList__status__filter__active
                : ""
            }
            onClick={() => {
              onChangeStatusFilter(FILTER_SEMINAR.IS_COMMING);
            }}
          >
            {FILTER_SEMINAR.IS_COMMING}
          </p>
          <p
            className={
              statusFilter === FILTER_SEMINAR.PAST
                ? style.seminarList__status__filter__active
                : ""
            }
            onClick={() => {
              onChangeStatusFilter(FILTER_SEMINAR.PAST);
            }}
          >
            {FILTER_SEMINAR.PAST}
          </p>
        </div>

        <CustomizedButton variant="outlined" color="primary600">
          <img
            className={style.seminarList__add_icon}
            src={require("../../../assets/icons/Add_Seminar.png")}
          />
          {BUTTON_LABEL.CREATE_SEMINAR}
        </CustomizedButton>
      </div>
      <Grid
        className={style.seminarList__list}
        container
        spacing={2}
        alignItems={"stretch"}
      >
        {seminars.map((data, index) => (
          <Grid key={`SEMINAR_CARD_${index}`} item xs={12} md={6} lg={3}>
            <SeminarCard data={data} />
          </Grid>
        ))}
      </Grid>
      {!!nextLink && (
        <p className={style.seminarList__viewMore} onClick={viewMoreSeminar}>
          Xem thêm
        </p>
      )}
    </div>
  );
};

export default SeminarList;
