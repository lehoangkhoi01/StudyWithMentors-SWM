import style from "./SeminarList.module.scss";
import { useEffect, useRef, useState } from "react";
import SeminarCard from "../SeminarCard/SeminarCard";
import { seminarService } from "../../../Services/seminarService";
import { Grid, Typography } from "@mui/material";
import SeminarFilter from "./SeminarFilter/SeminarFilter";
import CustomizedButton from "../../../shared/components/Button/CustomizedButton";
import {
  BUTTON_LABEL,
  FILTER_SEMINAR,
  OTHERS,
} from "../../../shared/constants/common";
import {
  useCustomAppbar,
  useCustomLoading,
} from "../../../Helpers/generalHelper";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../../../Store/slices/userSlice";
import { useHistory } from "react-router";
import { ROUTES } from "../../../shared/constants/navigation";
import { APPBAR_TITLES } from "../../../shared/constants/appbarTitles";
import { SYSTEM_ROLE } from "../../../shared/constants/systemType";

const SeminarList = () => {
  const [seminars, setSeminars] = useState([]);
  const [statusFilter, setStatusFilter] = useState(FILTER_SEMINAR.ALL);
  const [filterInfo, setFilterInfo] = useState();
  const [nextLink, setNextLink] = useState();

  const { setLoading } = useCustomLoading();
  const { setAppbar } = useCustomAppbar();

  setAppbar(APPBAR_TITLES.SEMINAR_LIST);

  const userInfo = useSelector(selectUserInfo);
  const filterRef = useRef();
  const history = useHistory();
  const AUTHORIZED_ROLE_SEMINAR = [SYSTEM_ROLE.ADMIN, SYSTEM_ROLE.STAFF];

  useEffect(() => {
    getSeminarList();
  }, []);

  useEffect(() => {
    getSeminarList();
  }, [filterInfo]);

  const onChangeStatusFilter = (status) => {
    const statusFilterParam =
      status === FILTER_SEMINAR.IS_COMMING
        ? "future"
        : status === FILTER_SEMINAR.PAST
        ? "past"
        : null;

    let filterDepartmentId = filterInfo?.departmentId;

    if (status === FILTER_SEMINAR.DEPARTMENT_SEMINAR) {
      filterDepartmentId = userInfo.departmentId;

      filterRef.current.resetSelectedDepartment();
    } else if (statusFilter === FILTER_SEMINAR.DEPARTMENT_SEMINAR) {
      // Check if last status is seminer by department or
      filterDepartmentId = null;
    }

    setStatusFilter(status);

    setFilterInfo({
      searchString: filterInfo?.searchString,
      startDate: filterInfo?.startDate,
      endDate: filterInfo?.endDate,
      departmentId: filterDepartmentId,
      status: statusFilterParam,
      ownSeminar: status === FILTER_SEMINAR.OWN_SEMINAR,
      mentorIds:
        status === FILTER_SEMINAR.OWN_SEMINAR ? [userInfo.accountId] : [],
    });
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
      history.push(ROUTES.SERVER_ERROR);
    } finally {
      setLoading(false);
    }
  };

  const onSeminarFilter = (seminarName, startDate, endDate, departmentId) => {
    let filterDepartmentId = filterInfo?.departmentId;

    if (departmentId && statusFilter === FILTER_SEMINAR.DEPARTMENT_SEMINAR) {
      setStatusFilter(FILTER_SEMINAR.ALL);
    } else if (statusFilter === FILTER_SEMINAR.DEPARTMENT_SEMINAR) {
      filterDepartmentId = userInfo.departmentId;
    }
    const status =
      statusFilter === FILTER_SEMINAR.IS_COMMING
        ? "future"
        : statusFilter === FILTER_SEMINAR.PAST
        ? "past"
        : statusFilter === FILTER_SEMINAR.OWN_SEMINAR
        ? FILTER_SEMINAR.OWN_SEMINAR
        : null;

    setFilterInfo({
      searchString: seminarName,
      startDate,
      endDate,
      departmentId: departmentId ?? filterDepartmentId,
      status,
      ownSeminar: status === FILTER_SEMINAR.OWN_SEMINAR,
      mentorIds:
        status === FILTER_SEMINAR.OWN_SEMINAR ? [userInfo.accountId] : [],
    });
  };

  const viewMoreSeminar = () => {
    getSeminarList(nextLink);
  };

  const navigateToCreatePage = () => {
    history.push(ROUTES.SEMINAR_CREATE);
  };

  return (
    <div style={{ flex: "none" }}>
      <SeminarFilter
        ref={filterRef}
        onSeminarFilter={onSeminarFilter}
        onChangeStatusFilter={onChangeStatusFilter}
        setFilterInfo={setFilterInfo}
      />
      {seminars.length > 0 ? (
        <>
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
              {userInfo?.role === SYSTEM_ROLE.STAFF && (
                <p
                  className={
                    statusFilter === FILTER_SEMINAR.DEPARTMENT_SEMINAR
                      ? style.seminarList__status__filter__active
                      : ""
                  }
                  onClick={() => {
                    onChangeStatusFilter(FILTER_SEMINAR.DEPARTMENT_SEMINAR);
                  }}
                >
                  {FILTER_SEMINAR.DEPARTMENT_SEMINAR}
                </p>
              )}
              {userInfo?.role === SYSTEM_ROLE.MENTOR && (
                <p
                  className={
                    statusFilter === FILTER_SEMINAR.OWN_SEMINAR
                      ? style.seminarList__status__filter__active
                      : ""
                  }
                  onClick={() => {
                    onChangeStatusFilter(FILTER_SEMINAR.OWN_SEMINAR);
                  }}
                >
                  {FILTER_SEMINAR.OWN_SEMINAR}
                </p>
              )}
            </div>

            {AUTHORIZED_ROLE_SEMINAR.includes(userInfo?.role) && (
              <CustomizedButton
                variant="outlined"
                color="primary600"
                onClick={navigateToCreatePage}
              >
                <img
                  className={style.seminarList__add_icon}
                  src={require("../../../assets/icons/Add_Seminar.png")}
                />
                {BUTTON_LABEL.CREATE_SEMINAR}
              </CustomizedButton>
            )}
          </div>
          <Grid
            className={style.seminarList__list}
            container
            spacing={2}
            alignItems={"stretch"}
          >
            {seminars.map((data, index) => (
              <Grid key={`SEMINAR_CARD_${index}`} item xs={12} md={6} xl={4}>
                <SeminarCard data={data} />
              </Grid>
            ))}
          </Grid>
          {!!nextLink && (
            <p
              className={style.seminarList__viewMore}
              onClick={viewMoreSeminar}
            >
              {OTHERS.VIEW_MORE}
            </p>
          )}
        </>
      ) : (
        <Typography textAlign="center">Chưa có dữ liệu</Typography>
      )}
    </div>
  );
};

export default SeminarList;
