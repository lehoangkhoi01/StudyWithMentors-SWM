import { useSelector } from "react-redux";
import { useCustomAppbar, useNotification } from "../../Helpers/generalHelper";
import { topicService } from "../../Services/topicService";
import CustomizedTable from "../../shared/components/Table/CustomizedTable";
import {
  CONFIRM_ACTION,
  UPSERT_ACTION,
  VIEW_DETAIL,
} from "../../shared/constants/actionType";
import {
  CONFIRM_TOPIC_MODAL,
  ERROR_MESSAGES,
  TABLE_ACTION,
  TABLE_TYPE,
  TOPIC_STATUS,
  TOPIC_STATUS_BACKEND,
  TOPIC_TABLE,
} from "../../shared/constants/common";
import { selectUserInfo } from "../../Store/slices/userSlice";
import { SYSTEM_ROLE } from "../../shared/constants/systemType";
import { useEffect, useState } from "react";
import { APPBAR_TITLES } from "../../shared/constants/appbarTitles";
import { sortDataByCreatedDate } from "../../Helpers/arrayHelper";

const HEADER_TABLE = [
  {
    sortable: true,
    property: "name",
    name: TOPIC_TABLE.NAME,
  },
  {
    sortable: true,
    property: "field",
    name: TOPIC_TABLE.FIELD,
  },
  {
    sortable: true,
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

const ACTION_ITEMS = [
  {
    imgSrc: require("../../assets/icons/Edit.png"),
    label: TABLE_ACTION.EDIT,
    action: UPSERT_ACTION,
  },
  {
    imgSrc: require("../../assets/icons/Accept.png"),
    label: CONFIRM_TOPIC_MODAL.ACCEPT,
    action: CONFIRM_ACTION,
  },
  {
    imgSrc: require("../../assets/icons/Accept.png"),
    label: CONFIRM_TOPIC_MODAL.SHOW,
    action: CONFIRM_ACTION,
  },
  {
    imgSrc: require("../../assets/icons/Deactive.png"),
    label: CONFIRM_TOPIC_MODAL.REJECT,
    action: CONFIRM_ACTION,
  },
  {
    imgSrc: require("../../assets/icons/Archive.png"),
    label: CONFIRM_TOPIC_MODAL.ARCHIVE,
    action: CONFIRM_ACTION,
  },
  {
    imgSrc: require("../../assets/icons/Detail.png"),
    label: CONFIRM_TOPIC_MODAL.DETAIL,
    action: VIEW_DETAIL,
  },
  {
    imgSrc: require("../../assets/icons/Table_Remove.png"),
    label: CONFIRM_TOPIC_MODAL.DELETE,
    action: CONFIRM_ACTION,
  },
];

const TopicList = () => {
  const { setNotification } = useNotification();
  const { setAppbar } = useCustomAppbar();
  setAppbar(APPBAR_TITLES.TOPIC_LIST);
  const userInfo = useSelector(selectUserInfo);

  const [headerTable, setHeaderTable] = useState([]);
  const [actionItems, setActionItems] = useState([]);

  const isAdmin = () => {
    return [SYSTEM_ROLE.ADMIN].includes(userInfo?.role);
  };

  const isMentor = () => {
    return userInfo?.role === SYSTEM_ROLE.MENTOR;
  };

  useEffect(() => {
    let header = [...HEADER_TABLE];
    let actions = [...ACTION_ITEMS];

    if (userInfo?.role === SYSTEM_ROLE.MENTOR) {
      header.splice(3, 1);
    }
    // else if (userInfo?.role === SYSTEM_ROLE.STAFF) {
    //   actions.splice(0, 1);
    // }

    actions = actions.map((action) => ({
      ...action,
      rule: (row) => {
        switch (action.label) {
          case TABLE_ACTION.EDIT:
            if (isMentor() && row.translatedStatus === TOPIC_STATUS.ACCEPTED) {
              return true;
            }

            return false;
          case CONFIRM_TOPIC_MODAL.ACCEPT:
            if (
              isAdmin() &&
              row.translatedStatus === TOPIC_STATUS.WAITING
            ) {
              return true;
            }

            return false;
          case CONFIRM_TOPIC_MODAL.SHOW:
            if (row.translatedStatus === TOPIC_STATUS.ARCHIVED) {
              return true;
            }

            return false;

          case CONFIRM_TOPIC_MODAL.REJECT:
            if (row.translatedStatus === TOPIC_STATUS.WAITING) {
              return true;
            }

            return false;

          case CONFIRM_TOPIC_MODAL.ARCHIVE:
            if (row.translatedStatus === TOPIC_STATUS.ACCEPTED) {
              return true;
            }

            return false;

          case CONFIRM_TOPIC_MODAL.DELETE:
            if (row.translatedStatus === TOPIC_STATUS.WAITING) {
              return true;
            }

            return false;

          default:
            return false;
        }
      },
    }));

    setHeaderTable(header);
    setActionItems(actions);
  }, [userInfo]);

  const getTopics = async () => {
    try {
      let topics = await topicService.getTopics();
      topics = sortDataByCreatedDate(topics);

      let updatedTopicList = topics.map((topic) => {
        return {
          ...topic,
          translatedStatus: TOPIC_STATUS[topic.status],
          mentorName: topic.mentor.fullName,
          description: topic.description ?? "",
        };
      });

      if (userInfo?.role === SYSTEM_ROLE.MENTOR) {
        updatedTopicList = updatedTopicList.filter(
          (item) => item.mentor.id === userInfo.accountId
        );
      }

      return updatedTopicList;
    } catch (error) {
      setNotification({
        isOpen: true,
        type: "error",
        message: ERROR_MESSAGES.COMMON_ERROR,
      });
    }
  };

  const onSearchTopic = (currentList, searchTerm) => {
    return currentList.filter((topic) =>
      topic.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const onDeleteTopic = async (topicId) => {
    await topicService.updateStatus(topicId, TOPIC_STATUS_BACKEND.DELETED);
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
        hideAddingAction={userInfo.role !== SYSTEM_ROLE.MENTOR}
      />
    </div>
  );
};

export default TopicList;
