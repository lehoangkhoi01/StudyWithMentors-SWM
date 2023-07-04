import { useNotification } from "../../Helpers/generalHelper";
import { topicService } from "../../Services/topicService";
import CustomizedTable from "../../shared/components/Table/CustomizedTable";
import {
  ACTIVE_ACTION,
  DEACTIVATE_ACTION,
  UPSERT_ACTION,
} from "../../shared/constants/actionType";
import {
  ERROR_MESSAGES,
  TABLE_ACTION,
  TOPIC_STATUS,
  TOPIC_TABLE,
} from "../../shared/constants/common";

const TopicList = () => {
  const { setNotification } = useNotification();

  const headerTable = [
    {
      sortable: true,
      center: true,
      property: "number",
      name: TOPIC_TABLE.NUMBER,
    },
    {
      sortable: true,
      property: "fullName",
      name: TOPIC_TABLE.NAME,
    },
    {
      sortable: true,
      property: "description",
      name: TOPIC_TABLE.DESCRIPTION,
    },
    {
      sortable: true,
      center: true,
      property: "field",
      name: TOPIC_TABLE.FIELD,
    },
    {
      sortable: true,
      center: true,
      property: "category",
      name: TOPIC_TABLE.CATEGORY,
    },
    {
      sortable: true,
      property: "mentorName",
      name: TOPIC_TABLE.MENTOR,
    },
    {
      sortable: true,
      property: "translatedStatus",
      name: TOPIC_TABLE.STATUS,
    },
  ];

  const actionItems = [
    {
      imgSrc: require("../../assets/icons/Edit.png"),
      label: TABLE_ACTION.EDIT,
      action: UPSERT_ACTION,
    },
    {
      imgSrc: require("../../assets/icons/Deactive.png"),
      label: TABLE_ACTION.ACTIVATE,
      action: ACTIVE_ACTION,
    },
    {
      imgSrc: require("../../assets/icons/Deactive.png"),
      label: TABLE_ACTION.DEACTIVATE,
      action: DEACTIVATE_ACTION,
    },
  ];

  const getTopics = async () => {
    try {
      const topics = await topicService.getTopics();

      const updatedTopicList = topics.map((topic, index) => {
        return {
          ...topic,
          number: index + 1,
          translatedStatus: TOPIC_STATUS[topic.status],
          mentorName: topic.mentor.fullName,
        };
      });

      return updatedTopicList;
    } catch (error) {
      console.log(error);

      setNotification({
        isOpen: true,
        type: "error",
        message: ERROR_MESSAGES.COMMON_ERROR,
      });
    }
  };

  const onSearchTopic = (currentList, searchTerm) => {
    return currentList.filter((topic) =>
      topic.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const onDeleteTopic = (topicId) => {
    topicService.updateStatus(topicId, TOPIC_STATUS.DELETED);
  };

  const onAcceptTopic = (topicId) => {
    topicService.updateStatus(topicId, TOPIC_STATUS.DELETED);
  };

  const onRejectTopic = (topicId) => {
    topicService.updateStatus(topicId, TOPIC_STATUS.REJECTED);
  };

  const onArchiveTopic = (topicId) => {
    topicService.updateStatus(topicId, TOPIC_STATUS.ARCHIVED);
  };

  return (
    <div>
      <CustomizedTable
        getData={getTopics}
        onSearch={onSearchTopic}
        onDelete={onDeleteTopic}
        onAccept={onAcceptTopic}
        onReject={onRejectTopic}
        onArchive={onArchiveTopic}
        headerTable={headerTable}
        actionItems={actionItems}
      />
    </div>
  );
};

export default TopicList;
