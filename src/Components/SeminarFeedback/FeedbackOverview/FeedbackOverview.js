import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import GlobalBreadcrumbs from "../../../shared/components/Breadcrumbs/GlobalBreadcrumbs";
import { BREADCRUMBS_TITLE } from "../../../shared/constants/breadcrumbs";
import { ROUTES, ROUTES_STATIC } from "../../../shared/constants/navigation";
import style from "./FeedbackOverview.module.scss";
import { seminarService } from "../../../Services/seminarService";
import { useEffect, useState } from "react";
import DoughnutChart from "../../../shared/components/PieChart/DoughnutChart";
import { Grid, Pagination, Typography } from "@mui/material";
import {
  FEEDBACK_LABEL,
  FEEDBACK_OVERVIEW,
  FEEDBACK_TYPE,
} from "../../../shared/constants/common";
import {
  RATING_LABEL,
  SYSTEM_ROLE,
} from "../../../shared/constants/systemType";
import { seminarFeedbackService } from "../../../Services/seminarFeedbackService";
import {
  useCustomAppbar,
  useCustomLoading,
} from "../../../Helpers/generalHelper";
import { APPBAR_TITLES } from "../../../shared/constants/appbarTitles";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../../../Store/slices/userSlice";

const FeedbackOverview = () => {
  const { setAppbar } = useCustomAppbar();
  setAppbar(APPBAR_TITLES.SEMINAR_REPORT);
  const [seminarDetail, setSeminarDetail] = useState();
  const [feedbackData, setFeedbackData] = useState();
  const [feedbackText, setFeedbackText] = useState({
    improvements: [],
    displayedImprovements: [],
    others: [],
    displayedOthers: [],
  });
  const [pagination, setPagination] = useState({
    improvements: {
      page: 1,
      pageSize: 5,
      totalPage: 1,
    },
    others: {
      page: 1,
      pageSize: 5,
      totalPage: 1,
    },
  });

  const { id } = useParams();
  const history = useHistory();
  const userInfo = useSelector(selectUserInfo);
  const { setLoading } = useCustomLoading();

  useEffect(() => {
    if (seminarDetail && feedbackData) {
      setLoading(false);
    }
  }, [seminarDetail, feedbackData]);

  useEffect(() => {
    const getSeminarDetail = async () => {
      try {
        const loopGetSeminarDetail = setTimeout(() => {
          setLoading(true);
        }, 100)
        const seminar = await seminarService.getSeminarDetail(id);
        if (
          (userInfo?.role === SYSTEM_ROLE.STAFF &&
            userInfo.departmentId !== seminar.department.id) ||
          userInfo?.role === SYSTEM_ROLE.STUDENT
        ) {
          history.push(ROUTES.NOT_FOUND);
        }
        setSeminarDetail(seminar);
        clearTimeout(loopGetSeminarDetail);
      } catch (error) {
        history.push(ROUTES.SERVER_ERROR);
      } finally {
        setLoading(false);
      }
    };

    const getFeedbackReport = async () => {
      try {
        const loopGetSeminarReport = setTimeout(() => {
          setLoading(true);
        }, 100)
        const seminar = await seminarFeedbackService.getReport(id);
        const { reportStatistic, improvements, others } = seminar;
        convertFeedbackBEToFE(reportStatistic);
        setFeedbackText({
          improvements,
          displayedImprovements: [],
          others,
          displayedOthers: [],
        });

        onPaginateImprovments(1, improvements);
        onPaginateOthers(1, others);
        clearTimeout(loopGetSeminarReport)
      } catch (error) {
        history.push(ROUTES.SERVER_ERROR);
      } finally {
        setLoading(false);
      }
    };

    getSeminarDetail();
    getFeedbackReport();
  }, []);

  const convertFeedbackBEToFE = (data) => {
    const adjustedData = data.map((item) => {
      const values = Object.values(item.statistics);

      switch (item.type) {
        case FEEDBACK_TYPE.YES_NO:
          return {
            ...item,
            label: FEEDBACK_LABEL.YES_NO,
            value: values,
          };

        case FEEDBACK_TYPE.RATTING:
          return {
            ...item,
            label: Object.values(RATING_LABEL),
            value: values,
            showAverage: true,
          };
        default:
          break;
      }
    });

    setFeedbackData(adjustedData);
  };

  const breadcrumbsNavigate = [
    { title: BREADCRUMBS_TITLE.SEMINAR_LIST, route: ROUTES.SEMINAR_LIST },
    {
      title: seminarDetail?.name,
      route: ROUTES_STATIC.SEMINAR_DETAIL + "/" + id,
    },
    {
      title: BREADCRUMBS_TITLE.FEEDBACK_OVERVIEW,
      route: null,
    },
  ];

  const onPaginateImprovments = (page, initData) => {
    const { pageSize } = pagination.improvements;

    const improvementsList = initData ?? feedbackText.improvements;

    let pageNumber = page;

    if (!page && improvementsList.length) {
      pageNumber = 1;
    }

    const totalPage = Math.ceil(improvementsList.length / pageSize);

    const adjustPage = totalPage >= pageNumber ? pageNumber : totalPage;
    const offset = pageSize * (adjustPage - 1);

    const paginatedImprovements = improvementsList.slice(
      offset,
      pageSize * adjustPage
    );

    setFeedbackText((prevValue) => {
      return {
        ...prevValue,
        displayedImprovements: paginatedImprovements,
      };
    });

    console.log("improvements:")
    console.log(totalPage)

    setPagination((prevValue) => {
      return {
        ...prevValue,
        improvements: {
          pageSize,
          page: adjustPage,
          totalPage,
        },
      };
    });
  };

  const onPaginateOthers = (page, initData) => {
    const { pageSize } = pagination.others;

    const othersList = initData ?? feedbackText.others;

    let pageNumber = page;

    if (!page && othersList.length) {
      pageNumber = 1;
    }

    const totalPage = Math.ceil(othersList.length / pageSize);

    const adjustPage = totalPage >= pageNumber ? pageNumber : totalPage;
    const offset = pageSize * (adjustPage - 1);

    const paginatedOthers = othersList.slice(offset, pageSize * adjustPage);

    setFeedbackText((prevValue) => {
      return {
        ...prevValue,
        displayedOthers: paginatedOthers,
      };
    });

    console.log("others:")
    console.log(totalPage)
    setPagination((prevValue) => {
      return {
        ...prevValue,
        others: {
          pageSize,
          page: adjustPage,
          totalPage,
        },
      };
    });
  };

  return (
    <>
      {seminarDetail && feedbackData && (
        <div className={style.overview__container}>
          <GlobalBreadcrumbs navigate={breadcrumbsNavigate} />
          <div className={style.overview__information}>
            <div className={style.overview__title}>
              <h2>{FEEDBACK_OVERVIEW.SEMNIAR_REPORT}</h2>
              <p>{seminarDetail.name}</p>
            </div>
            <div className={style.overview__charts}>
              <Grid container spacing={2} alignItems={"stretch"}>
                {feedbackData.length !== 0 &&
                  feedbackData.map((data, index) => (
                    <Grid key={`CHART_${index}`} item xs={12} sm={6} md={4}>
                      <DoughnutChart data={data} />
                    </Grid>
                  ))}
                {feedbackData.length === 0 && (
                  <Typography
                    variant="p"
                    className={`${style.text} ${style.instructions}`}
                    fontSize={"1rem"}
                    marginTop={"1rem"}
                  >
                    Chưa có đánh giá nào cho hội thảo này
                  </Typography>
                )}
              </Grid>
            </div>
            <div>
              <p className={style.overview__subHeader}>
                {FEEDBACK_OVERVIEW.IMPROVEMENT}(
                {feedbackText.displayedImprovements.length})
              </p>
              {feedbackText.displayedImprovements.map((improvement, index) => (
                <p
                  key={`IMPROVEMENT_${index}`}
                  className={style.overview__feedbackItem}
                >
                  {improvement}
                </p>
              ))}
              <Pagination
                className={style.overview__pagination}
                variant="outlined"
                shape="rounded"
                page={pagination.improvements.page}
                count={pagination.improvements.totalPage}
                onChange={(_, page) => {
                  onPaginateImprovments(page);
                }}
              />
            </div>
            <div>
              <p className={style.overview__subHeader}>
                {FEEDBACK_OVERVIEW.OTHERS} (
                {feedbackText.displayedOthers.length})
              </p>
              {feedbackText.displayedOthers.map((other, index) => (
                <p
                  key={`OTHER_${index}`}
                  className={style.overview__feedbackItem}
                >
                  {other}
                </p>
              ))}
              <Pagination
                className={style.overview__pagination}
                variant="outlined"
                shape="rounded"
                page={pagination.others.page}
                count={pagination.others.totalPage}
                onChange={(_, page) => {
                  onPaginateOthers(page);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FeedbackOverview;
