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
  deleteField: (id) => {
    const url = `${TopicEndpoints.DELETE_TOPIC_FIELD}/${id}`;

    return axiosClient.delete(url);
  },
  createField: (data) => {
    const url = TopicEndpoints.UPSERT_TOPIC_FIELD;
    return axiosClient.post(url, data);
  },
  updateField: (data, id) => {
    const url = `${TopicEndpoints.UPSERT_TOPIC_FIELD}/${id}`;
    return axiosClient.put(url, data);
  },
  
  deleteCategory: (id) => {
    const url = `${TopicEndpoints.DELETE_TOPIC_CATEGORIES}/${id}`;

    return axiosClient.delete(url);
  },
  createCategory: (data) => {
    const url = TopicEndpoints.UPSERT_TOPIC_CATEGORIES;
    return axiosClient.post(url, data);
  },
  updateCategory: (data, id) => {
    const url = `${TopicEndpoints.UPSERT_TOPIC_CATEGORIES}/${id}`;
    return axiosClient.put(url, data);
  },
};
