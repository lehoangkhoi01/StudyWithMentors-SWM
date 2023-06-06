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

const DUMMY = [
  {
    id: 1,
    question: "Bạn đánh giá tổng quan thế nào về trải nghiệm với buổi seminar?",
    type: "RATING",
    statistics: {
      1: 0,
      2: 2,
      3: 2,
      4: 0,
      5: 0,
    },
  },
  {
    id: 2,
    question: "Sự kiện có đáp ứng được mong đợi của bạn không?",
    type: "YES/NO",
    statistics: {
      No: 2,
      Yes: 2,
    },
  },
  {
    id: 3,
    question: "Chủ đề và buổi diễn thảo có phù hợp và cuốn hút bạn không?",
    type: "YES/NO",
    statistics: {
      No: 0,
      Yes: 4,
    },
  },
  {
    id: 4,
    question: "Bạn đánh giá thế nào về mặt tổ chức và hậu cần của sự kiện?",
    type: "RATING",
    statistics: {
      1: 0,
      2: 3,
      3: 0,
      4: 0,
      5: 0,
      6: 1,
    },
  },
  {
    id: 5,
    question:
      "Bạn đánh giá thế nào về chất lượng và chuyên môn của diễn giả men1",
    type: "RATING",
    statistics: {
      1: 0,
      2: 0,
      3: 4,
      4: 0,
      5: 0,
    },
  },
  {
    id: 6,
    question:
      "Bạn có muốn được kết nối với diễn giả men1 sau buổi seminar này không?",
    type: "YES/NO",
    statistics: {
      No: 0,
      Yes: 4,
    },
  },
  {
    id: 7,
    question:
      "Bạn đánh giá thế nào về chất lượng và chuyên môn của diễn giả men2",
    type: "RATING",
    statistics: {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 4,
    },
  },
  {
    id: 8,
    question:
      "Bạn có muốn được kết nối với diễn giả men2 sau buổi seminar này không?",
    type: "YES/NO",
    statistics: {
      No: 4,
      Yes: 0,
    },
  },
  {
    id: 9,
    question:
      "Bạn đánh giá thế nào về chất lượng và chuyên môn của diễn giả men4",
    type: "RATING",
    statistics: {
      0: 4,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    },
  },
  {
    id: 10,
    question:
      "Bạn có muốn được kết nối với diễn giả men4 sau buổi seminar này không?",
    type: "YES/NO",
    statistics: {
      No: 4,
      Yes: 0,
    },
  },
];
const FeedbackOverview = () => {
  const [seminarDetail, setSeminarDetail] = useState();
  const [feedbackData, setFeedbackData] = useState(DUMMY);

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

    convertFeedbackBEToFE(DUMMY);
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
        {seminarDetail && (
          <div className={style.overview__information}>
            <div className={style.overview__title}>
              <h2>Báo cáo sự kiện</h2>
              <p>{seminarDetail.name}</p>
            </div>
            <div className={style.overview__charts}>
              <Grid container spacing={2} alignItems={"stretch"}>
                {feedbackData.map((data, index) => (
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
