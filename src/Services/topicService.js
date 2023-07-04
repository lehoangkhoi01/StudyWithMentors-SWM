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
  getTopics: () => {
    const url = TopicEndpoints.GET_TOPICS;

    return axiosClient.get(url);
  },
  upsertTopic: (data) => {
    const url = TopicEndpoints.UPSERT_TOPICS;

    return axiosClient.post(url, data);
  },
};
