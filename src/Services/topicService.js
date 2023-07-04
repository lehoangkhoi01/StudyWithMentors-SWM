import axiosClient from "./Axios/axiosClient";
import { TopicEndpoints } from "./apiEndpoints";

export const topicService = {
  getCategories: () => {
    const url = TopicEndpoints.GET_TOPIC_CATEGORIES;

    return axiosClient.get(url);
  },
  getFields: () => {
    const url = TopicEndpoints.GET_TOPIC_FIELDS;

    return axiosClient.get(url);
  },
};
