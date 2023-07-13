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
  getTopicsByMentor: (id) => {
    const url = TopicEndpoints.TOPICS_MENTOR + "/" + id;
    return axiosClient.get(url);
  },
  upsertTopic: (data, id) => {
    const url = TopicEndpoints.TOPICS + (id ? `/${id}` : "");
    return axiosClient.post(url, data);
  },
  updateStatus: (id, status) => {
    const url = TopicEndpoints.UPADATE_TOPIC_STATUS;
    const payload = {
      ids: [id],
      status,
    };
    return axiosClient.post(url, payload);
  },
};
