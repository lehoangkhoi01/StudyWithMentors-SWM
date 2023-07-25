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
  const [displayedMentors, setDisplayedMentors] = useState([]);

  const getMentors = async () => {
    try {
      setLoading(true);
      const mentorsData = await accountService.getAllMoreInfoMentors();

      setMentors(mentorsData.mentorCards);
    } catch (error) {
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

  useEffect(() => {
    onPaginate(1, mentors);
  }, [mentors]);

  const onChangeStatusFilter = (status) => {
    setStatusFilter(status);
  };

  const onPaginate = (page, initData) => {
    const { pageSize } = pagination;

    const itemList = initData ?? mentors;

    let pageNumber = page;

    if (!page && itemList.length) {
      pageNumber = 1;
    }

    const totalPage = Math.ceil(itemList.length / pageSize);

    const adjustPage = totalPage >= pageNumber ? pageNumber : totalPage;
    const offset = pageSize * (adjustPage - 1);

    const paginatedData = itemList.slice(offset, pageSize * adjustPage);

    setDisplayedMentors(paginatedData);

    setPagination({
      pageSize,
      page: adjustPage,
      totalPage,
    });
  };

  return (
    <>
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
        <Grid className={`${style.mentorList__cards}`} container spacing={3}>
          {displayedMentors.map((mentor, index) => (
            <Grid
              key={`MENTOR_CARD_${index}`}
              item
              xs={12}
              md={6}
              lg={4}
              xl={3}
            >
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
    </>
  );
};

export default MentorList;
