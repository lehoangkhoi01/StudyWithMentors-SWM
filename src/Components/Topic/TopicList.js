import { useSelector } from "react-redux";
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
import { selectUserInfo } from "../../Store/slices/userSlice";
import { SYSTEM_ROLE } from "../../shared/constants/systemType";
import { useEffect, useState } from "react";

const HEADER_TABLE = [
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

const TopicList = () => {
  const { setNotification } = useNotification();
  const userInfo = useSelector(selectUserInfo);

  const [headerTable, setHeaderTable] = useState([]);

  useEffect(() => {
    const header = HEADER_TABLE;

    if (userInfo.role === SYSTEM_ROLE.MENTOR) {
      header.splice(5, 1);
    }

    setHeaderTable(header);
  }, []);

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

      let updatedTopicList = topics.map((topic, index) => {
        return {
          ...topic,
          number: index + 1,
          translatedStatus: TOPIC_STATUS[topic.status],
          mentorName: topic.mentor.fullName,
        };
      });

      console.log(userInfo.role)

      if (userInfo.role === SYSTEM_ROLE.MENTOR) {
        updatedTopicList = updatedTopicList.filter(
          (item) => item.mentor.id === userInfo.accountId
        );
      }

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
        filterData={onSearchTopic}
        onDelete={onDeleteTopic}
        onUpdateTopicStatus={onUpdateTopicStatus}
        headerTable={headerTable}
        actionItems={actionItems}
      />
    </div>
  );
};

export default TopicList;
