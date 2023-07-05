import { useNotification } from "../../Helpers/generalHelper";
import { topicService } from "../../Services/topicService";
import CustomizedTable from "../../shared/components/Table/CustomizedTable";
import {
  CONFIRM_ACTION,
  UPSERT_ACTION,
} from "../../shared/constants/actionType";
import {
  CONFIRM_TOPIC_MODAL,
  ERROR_MESSAGES,
  TABLE_ACTION,
  TABLE_TYPE,
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
      property: "name",
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
      label: CONFIRM_TOPIC_MODAL.ACCEPT,
      action: CONFIRM_ACTION,
    },
    {
      imgSrc: require("../../assets/icons/Deactive.png"),
      label: CONFIRM_TOPIC_MODAL.REJECT,
      action: CONFIRM_ACTION,
    },
    {
      imgSrc: require("../../assets/icons/Deactive.png"),
      label: CONFIRM_TOPIC_MODAL.ARCHIVE,
      action: CONFIRM_ACTION,
    },
  ];

  const getTopics = async () => {
    try {
      const topics = await topicService.getTopics();

      console.log(topics);

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

  const onDeleteTopic = async (topicId) => {
    await topicService.updateStatus(topicId, TOPIC_STATUS.DELETED);
  };

  const onUpdateTopicStatus = async (topicId, status) => {
    await topicService.updateStatus(topicId, status);
  };

  return (
    <div>
      <CustomizedTable
        type={TABLE_TYPE.TOPIC}
        getData={getTopics}
        onSearch={onSearchTopic}
        onDelete={onDeleteTopic}
        onUpdateTopicStatus={onUpdateTopicStatus}
        headerTable={headerTable}
        actionItems={actionItems}
      />
    </div>
  );
};

export default TopicList;
