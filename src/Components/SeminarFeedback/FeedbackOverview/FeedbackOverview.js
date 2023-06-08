import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import GlobalBreadcrumbs from "../../../shared/components/Breadcrumbs/GlobalBreadcrumbs";
import { BREADCRUMBS_TITLE } from "../../../shared/constants/breadcrumbs";
import { ROUTES, ROUTES_STATIC } from "../../../shared/constants/navigation";
import style from "./FeedbackOverview.module.scss";
import { seminarService } from "../../../Services/seminarService";
import { useEffect, useState } from "react";
import DoughnutChart from "../../../shared/components/PieChart/DoughnutChart";
import { Grid, Pagination } from "@mui/material";
import {
  FEEDBACK_LABEL,
  FEEDBACK_TYPE,
} from "../../../shared/constants/common";
import { RATING_LABEL } from "../../../shared/constants/systemType";
import { seminarFeedbackService } from "../../../Services/seminarFeedbackService";

const FeedbackOverview = () => {
  const [seminarDetail, setSeminarDetail] = useState();
  const [feedbackData, setFeedbackData] = useState();

  const { id } = useParams();

  useEffect(() => {
    const getSeminarDetail = async () => {
      try {
        const seminar = await seminarService.getSeminarDetail(id);
        setSeminarDetail(seminar);
      } catch (error) {
        console.log(error);
      }
    };

    const getFeedbackReport = async () => {
      try {
        const seminar = await seminarFeedbackService.getReport(id);

        console.log(seminar);

        convertFeedbackBEToFE(seminar);
      } catch (error) {
        console.log(error);
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
          console.log(item.type);
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

  return (
    <div>
      <div className={style.overview__container}>
        <GlobalBreadcrumbs navigate={breadcrumbsNavigate} />
        {seminarDetail && feedbackData && (
          <div className={style.overview__information}>
            <div className={style.overview__title}>
              <h2>Báo cáo sự kiện</h2>
              <p>{seminarDetail.name}</p>
            </div>
            <div className={style.overview__charts}>
              <Grid container spacing={2} alignItems={"stretch"}>
                {feedbackData.map((data, index) => (
                  <Grid key={`CHART_${index}`} item xs={12} sm={6} md={4}>
                    <DoughnutChart data={data} />
                  </Grid>
                ))}
              </Grid>
            </div>
            <div>
              <p className={style.overview__subHeader}>
                Cần cải thiện (20 câu trả lời)
              </p>
              <p className={style.overview__feedbackItem}>
                Corem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit interdum, ac aliquet odio mattis.
                Class aptent taciti sociosqu ad litora torquent per conubia
                nostra, per inceptos himenaeos.
              </p>
              <p className={style.overview__feedbackItem}>
                Corem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit interdum, ac aliquet odio mattis.
                Class aptent taciti sociosqu ad litora torquent per conubia
                nostra, per inceptos himenaeos.
              </p>
              <p className={style.overview__feedbackItem}>
                Corem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit interdum, ac aliquet odio mattis.
                Class aptent taciti sociosqu ad litora torquent per conubia
                nostra, per inceptos himenaeos.
              </p>
              <p className={style.overview__feedbackItem}>
                Corem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit interdum, ac aliquet odio mattis.
                Class aptent taciti sociosqu ad litora torquent per conubia
                nostra, per inceptos himenaeos.
              </p>
              <p className={style.overview__feedbackItem}>
                Corem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit interdum, ac aliquet odio mattis.
                Class aptent taciti sociosqu ad litora torquent per conubia
                nostra, per inceptos himenaeos.
              </p>
              <Pagination
                className={style.overview__pagination}
                count={6}
                variant="outlined"
                shape="rounded"
              />
            </div>
            <div>
              <p className={style.overview__subHeader}>
                Cần cải thiện (15 câu trả lời)
              </p>
              <p className={style.overview__feedbackItem}>
                Corem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit interdum, ac aliquet odio mattis.
                Class aptent taciti sociosqu ad litora torquent per conubia
                nostra, per inceptos himenaeos.
              </p>
              <p className={style.overview__feedbackItem}>
                Corem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit interdum, ac aliquet odio mattis.
                Class aptent taciti sociosqu ad litora torquent per conubia
                nostra, per inceptos himenaeos.
              </p>
              <p className={style.overview__feedbackItem}>
                Corem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit interdum, ac aliquet odio mattis.
                Class aptent taciti sociosqu ad litora torquent per conubia
                nostra, per inceptos himenaeos.
              </p>
              <p className={style.overview__feedbackItem}>
                Corem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit interdum, ac aliquet odio mattis.
                Class aptent taciti sociosqu ad litora torquent per conubia
                nostra, per inceptos himenaeos.
              </p>
              <p className={style.overview__feedbackItem}>
                Corem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit interdum, ac aliquet odio mattis.
                Class aptent taciti sociosqu ad litora torquent per conubia
                nostra, per inceptos himenaeos.
              </p>
              <Pagination
                className={style.overview__pagination}
                count={6}
                variant="outlined"
                shape="rounded"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackOverview;
