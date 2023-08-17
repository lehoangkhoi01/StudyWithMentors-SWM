/*
    Define some constant title and link for breadcrumbs
*/

import { ROUTES } from "./navigation";

export const BREADCRUMBS_TITLE = {
  SEMINAR_LIST: "Danh sách hội thảo",
  CREATE_SEMINAR: "Tạo hội thảo mới",
  UPDATE_SEMINAR: "Chỉnh sửa hội thảo",
  FEEDBACK_OVERVIEW: "Báo cáo hội thảo",
  MENTOR_LIST: "Danh sách mentor",
};

export const CREATE_SEMINAR_BREADCRUMBS = [
  {
    title: BREADCRUMBS_TITLE.SEMINAR_LIST,
    route: ROUTES.SEMINAR_LIST,
  },
  {
    title: BREADCRUMBS_TITLE.CREATE_SEMINAR,
    route: null,
  },
];
