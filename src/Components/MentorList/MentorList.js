import React from "react";
import ImageSlider from "./ImageSlider/ImageSlider";
import style from "./MentorList.module.scss";
import FilterSection from "./FilterSection/FilterSection";
import MentorCard from "./MentorCard/MentorCard";
import { Grid, Pagination } from "@mui/material";
import { ERROR_MESSAGES, FILTER_SEMINAR } from "../../shared/constants/common";
import { useState } from "react";
import { useEffect } from "react";
import { accountService } from "../../Services/accountService";
import { useCustomLoading, useNotification } from "../../Helpers/generalHelper";

const MentorList = () => {
  const { setLoading } = useCustomLoading();
  const { setNotification } = useNotification();

  const [statusFilter, setStatusFilter] = useState(FILTER_SEMINAR.ALL);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 12,
    totalPage: 1,
  });
  const [mentors, setMentors] = useState([]);
  console.log(mentors);
  const getMentors = async () => {
    try {
      setLoading(true);
      const mentorsData = await accountService.getAllMoreInfoMentors();
      console.log(mentorsData.mentorCards);

      setMentors(mentorsData.mentorCards);
    } catch (error) {
      console.log(error);

      setNotification({
        isOpen: true,
        type: "error",
        message: ERROR_MESSAGES.COMMON_ERROR,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMentors();
  }, []);

  const onChangeStatusFilter = (status) => {
    setStatusFilter(status);
  };

  const onPaginate = (page) => {
    setPagination({ page, pageSize: 12, totalPage: 1 });
  };

  return (
    <div className={`${style.mentorList__container}`}>
      <ImageSlider />
      <FilterSection onChangeStatusFilter={onChangeStatusFilter} />
      <div className={style.mentorList__status__filter}>
        <div className={style.mentorList__status__filter__items}>
          <p
            className={
              statusFilter === FILTER_SEMINAR.ALL
                ? style.mentorList__status__filter__active
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
              statusFilter === FILTER_SEMINAR.POPULAR
                ? style.mentorList__status__filter__active
                : ""
            }
            onClick={() => {
              onChangeStatusFilter(FILTER_SEMINAR.POPULAR);
            }}
          >
            {FILTER_SEMINAR.POPULAR}
          </p>
          <p
            className={
              statusFilter === FILTER_SEMINAR.FOLLOWING
                ? style.mentorList__status__filter__active
                : ""
            }
            onClick={() => {
              onChangeStatusFilter(FILTER_SEMINAR.FOLLOWING);
            }}
          >
            {FILTER_SEMINAR.FOLLOWING}
          </p>
        </div>
      </div>
      <Grid container spacing={3}>
        {mentors.map((mentor, index) => (
          <Grid key={`MENTOR_CARD_${index}`} item xs={12} md={6} lg={4} xl={3}>
            <MentorCard data={mentor} />
          </Grid>
        ))}
      </Grid>
      <Pagination
        className={style.list__pagination}
        count={pagination.totalPage}
        variant="outlined"
        shape="rounded"
        page={pagination.page}
        onChange={(_, page) => {
          onPaginate(page);
        }}
      />
    </div>
  );
};

export default MentorList;
