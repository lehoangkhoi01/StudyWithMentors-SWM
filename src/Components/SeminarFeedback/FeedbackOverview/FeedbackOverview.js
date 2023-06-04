import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import GlobalBreadcrumbs from "../../../shared/components/Breadcrumbs/GlobalBreadcrumbs";
import { BREADCRUMBS_TITLE } from "../../../shared/constants/breadcrumbs";
import { ROUTES, ROUTES_STATIC } from "../../../shared/constants/navigation";
import style from "./FeedbackOverview.module.scss";
import { seminarService } from "../../../Services/seminarService";
import { useEffect, useState } from "react";
import DoughnutChart from "../../../shared/components/PieChart/DoughnutChart";
import { Grid, Pagination } from "@mui/material";

const DUMMY = [
  {
    title: "Tổng quan sự kiện",
    label: ["5 sao", "4 sao", "3 sao", "2 sao", "1 sao"],
    value: [6, 3, 4, 2, 1],
  },
  {
    title: "Chủ đề cuốn hút",
    label: ["5 sao", "4 sao", "3 sao", "2 sao", "1 sao"],
    value: [6, 3, 4, 2, 1],
  },
];

const FeedbackOverview = () => {
  const [seminarDetail, setSeminarDetail] = useState();

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

    getSeminarDetail();
  }, []);

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
        {seminarDetail && (
          <div className={style.overview__information}>
            <div className={style.overview__title}>
              <h2>Báo cáo sự kiện</h2>
              <p>{seminarDetail.name}</p>
            </div>
            <div className={style.overview__charts}>
              <Grid container spacing={2} alignItems={"stretch"}>
                {DUMMY.map((data, index) => (
                  <Grid key={`CHART_${index}`} item xs={12} md={6} lg={3}>
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
