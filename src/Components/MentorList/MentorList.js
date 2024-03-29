import React from "react";
import ImageSlider from "./ImageSlider/ImageSlider";
import style from "./MentorList.module.scss";
import FilterSection from "./FilterSection/FilterSection";
import MentorCard from "./MentorCard/MentorCard";
import { Grid, Pagination, Typography } from "@mui/material";
import { ERROR_MESSAGES, FILTER_SEMINAR } from "../../shared/constants/common";
import { useState } from "react";
import { useEffect } from "react";
import { accountService } from "../../Services/accountService";
import {
  useCustomLoading,
  useFetchTopicFieldsAndCategories,
  useNotification,
} from "../../Helpers/generalHelper";
import { followMentorService } from "../../Services/followMentorService";
import { useSelector } from "react-redux";
import { SYSTEM_ROLE } from "../../shared/constants/systemType";
import { selectUserInfo } from "../../Store/slices/userSlice";

const MANAGE_ROLES = [SYSTEM_ROLE.STAFF, SYSTEM_ROLE.ADMIN];
const MentorList = () => {
  const { setLoading } = useCustomLoading();
  const { setNotification } = useNotification();
  const { getTopicFields, getTopicCategories } =
    useFetchTopicFieldsAndCategories();
  const userInfo = useSelector(selectUserInfo);

  const [statusFilter, setStatusFilter] = useState(FILTER_SEMINAR.ALL);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 12,
    totalPage: 1,
  });
  const [allMentors, setAllMentors] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [displayedMentors, setDisplayedMentors] = useState([]);
  const [followingMentors, setFollowingMentors] = useState([]);
  const [fields, setFields] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filterInfo, setFilterInfo] = useState({});

  useEffect(() => {
    getMentors();
    getFields();
    getCategories();
    if (userInfo?.role === SYSTEM_ROLE.STUDENT) {
      getFollowingMentors();
    }
  }, []);

  useEffect(() => {
    onPaginate(1, mentors);
  }, [mentors]);

  useEffect(() => {
    if (statusFilter === FILTER_SEMINAR.ALL) {
      getMentors();
    } else if (statusFilter === FILTER_SEMINAR.FOLLOWING) {
      const newMentorList = allMentors.filter((mentor) =>
        followingMentors.includes(mentor.mentorId)
      );
      setMentors(newMentorList);
    } else if (statusFilter === FILTER_SEMINAR.RECOMMEND) {
      getReommendMentors();
    }
  }, [statusFilter]);

  useEffect(() => {
    if (statusFilter === FILTER_SEMINAR.ALL) {
      getMentors();
    } else if (statusFilter === FILTER_SEMINAR.FOLLOWING) {
      getMentors(true);
    } else if (statusFilter === FILTER_SEMINAR.RECOMMEND) {
      getReommendMentors();
    }
  }, [filterInfo]);

  const getMentors = async (getFollowingMentors) => {
    try {
      const loopGettingMentopr = setTimeout(() => {
        setLoading(true);
      }, 100);
      const mentorsData = await accountService.getAllMoreInfoMentors(filterInfo);
      setAllMentors(mentorsData.mentorCards);
      if (getFollowingMentors) {
        const newMentorList = mentorsData.mentorCards.filter((mentor) =>
          followingMentors.includes(mentor.mentorId)
        );
        setMentors(newMentorList);
      } else {
        setMentors(mentorsData.mentorCards);
      }
      clearTimeout(loopGettingMentopr);
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

  const getReommendMentors = async () => {
    try {
      const loopGettingRecommend = setTimeout(() => {
        setLoading(true);
      }, 100);
      const mentorsData = await accountService.getRecommendMentors(filterInfo);
      setMentors(mentorsData.mentorCards);
      clearTimeout(loopGettingRecommend);
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

  const getFields = async () => {
    try {
      setLoading(true);
      const loopGettingFields = setTimeout(() => {
        setLoading(true);
      }, 100);
      const fieldsBE = await getTopicFields();
      setFields(fieldsBE);
      clearTimeout(loopGettingFields)
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

  const getCategories = async () => {
    try {
      setLoading(true);
      const loopGettingCategories = setTimeout(() => {
        setLoading(true);
      }, 100);
      const categoriesBE = await getTopicCategories();
      clearTimeout(loopGettingCategories)
      setCategories(categoriesBE);
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

  const getFollowingMentors = async () => {
    try {
      setLoading(true);
      const loopGettingFollowing = setTimeout(() => {
        setLoading(true);
      }, 100);
      let result = await followMentorService.getFollowing(userInfo?.accountId);
      result = result.map((mentor) => mentor.accountId);
      setFollowingMentors(result);
      clearTimeout(loopGettingFollowing)
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

  const onFollowSuccessfully = (mentorId) => {
    setFollowingMentors((prevValue) => {
      return [...prevValue, mentorId];
    });
  };

  const onUnfollowSuccessfully = (mentorId) => {
    setFollowingMentors((prevValue) => {
      const selectedMentorIndex = prevValue.findIndex(
        (currentMentorId) => currentMentorId === mentorId
      );
      let newFollowingMentors = [...prevValue];

      newFollowingMentors.splice(selectedMentorIndex, 1);

      return [...newFollowingMentors];
    });
  };

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

  const onUpdateFilter = (param) => {
    setFilterInfo(param);
  };

  return (
    <div className={`${style.mentorList__container}`}>
      <ImageSlider />
      <FilterSection
        fields={fields}
        categories={categories}
        onChangeStatusFilter={onChangeStatusFilter}
        setFilterInfo={setFilterInfo}
        onSearch={onUpdateFilter}
      />
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
          {userInfo?.role === SYSTEM_ROLE.STUDENT && (
            <>
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
              <p
                className={
                  statusFilter === FILTER_SEMINAR.RECOMMEND
                    ? style.mentorList__status__filter__active
                    : ""
                }
                onClick={() => {
                  onChangeStatusFilter(FILTER_SEMINAR.RECOMMEND);
                }}
              >
                {FILTER_SEMINAR.RECOMMEND}
              </p>
            </>
          )}
        </div>
      </div>
      {displayedMentors.length > 0 ? (
        <>
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
                <MentorCard
                  key={`MENTOR_CARD_${index}`}
                  data={mentor}
                  followingMentors={followingMentors}
                  onFollowSuccessfully={onFollowSuccessfully}
                  onUnfollowSuccessfully={onUnfollowSuccessfully}
                />
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
        </>
      ) : (
        <div
          className={
            MANAGE_ROLES.includes(userInfo?.role)
              ? `${style.mentorList__emptyText}`
              : null
          }
        >
          <Typography textAlign="center">Chưa có dữ liệu</Typography>
        </div>
      )}
    </div>
  );
};

export default MentorList;
