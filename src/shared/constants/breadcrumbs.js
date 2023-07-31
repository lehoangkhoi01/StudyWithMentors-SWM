/*
    Define some constant title and link for breadcrumbs
*/

import { ROUTES } from "./navigation";

export const BREADCRUMBS_TITLE = {
  SEMINAR_LIST: "Danh sách sự kiện",
  CREATE_SEMINAR: "Tạo sự kiện mới",
  UPDATE_SEMINAR: "Chỉnh sửa sự kiện",
  FEEDBACK_OVERVIEW: "Báo cáo sự kiện",
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
