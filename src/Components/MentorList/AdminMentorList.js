import {
  ADMIN_TABLE_HEADER,
  DATE_FORMAT,
  ERROR_MESSAGES,
  MENTOR_STATUS,
  TABLE_ACTION,
  TABLE_DETAIL,
  TABLE_TYPE,
} from "../../shared/constants/common";
import { handleTimeToDisplay } from "../../Helpers/dateHelper";
import { accountService } from "../../Services/accountService";
import {
  useCustomAppbar,
  useFetchSpeakerList,
  useNotification,
} from "../../Helpers/generalHelper";
import CustomizedTable from "../../shared/components/Table/CustomizedTable";
import { userAccountService } from "../../Services/userAccountService";
import {
  ACTIVE_ACTION,
  DEACTIVATE_ACTION,
  UPSERT_ACTION,
} from "../../shared/constants/actionType";
import { APPBAR_TITLES } from "../../shared/constants/appbarTitles";

const AdminMentorList = () => {
  const { getLatestSpeakerList } = useFetchSpeakerList();
  const { setNotification } = useNotification();
  const { setAppbar } = useCustomAppbar();
  setAppbar(APPBAR_TITLES.MENTOR_LIST);

  const headerTable = [
    {
      sortable: true,
      property: "fullName",
      name: ADMIN_TABLE_HEADER.NAME,
    },
    {
      sortable: true,
      property: "email",
      name: ADMIN_TABLE_HEADER.EMAIL,
    },
    {
      sortable: true,
      center: true,
      property: "phoneNum",
      name: ADMIN_TABLE_HEADER.PHONE,
    },
    {
      center: true,
      name: ADMIN_TABLE_HEADER.PROFILE,
      link: true,
    },
    {
      sortable: true,
      property: "defaultCreatedDate",
      name: ADMIN_TABLE_HEADER.CREATED_DATE,
    },
    {
      sortable: true,
      property: "translatedStatus",
      name: ADMIN_TABLE_HEADER.STATUS,
    },
  ];

  const actionItems = [
    {
      imgSrc: require("../../assets/icons/Edit.png"),
      label: TABLE_ACTION.EDIT,
      action: UPSERT_ACTION,
    },
    {
      imgSrc: require("../../assets/icons/Accept.png"),
      label: TABLE_ACTION.ACTIVATE,
      action: ACTIVE_ACTION,
    },
    {
      imgSrc: require("../../assets/icons/Deactive.png"),
      label: TABLE_ACTION.DEACTIVATE,
      action: DEACTIVATE_ACTION,
    },
  ];

  const statusItems = [
    { name: MENTOR_STATUS.ALL },
    { name: MENTOR_STATUS.ACTIVATED },
    { name: MENTOR_STATUS.INVALIDATE },
    { name: MENTOR_STATUS.WAITING },
  ]

  const getMentors = async () => {
    try {
      const mentors = await getLatestSpeakerList();

      const updatedMentorList = mentors.map((mentor) => {
        return {
          ...mentor,
          createdDate: handleTimeToDisplay(
            mentor.createdDate,
            null,
            DATE_FORMAT.DD_MM_YYYY,
            " -"
          ),
          defaultCreatedDate: mentor.createdDate,
          link: `/cv/${mentor.id}`,
          linkName: TABLE_DETAIL.CV_MENTOR,
          translatedStatus: MENTOR_STATUS[mentor.status],
          phoneNum: mentor.phoneNum ? mentor.phoneNum : "Chưa có",
        };
      });

      return updatedMentorList;
    } catch (error) {
      setNotification({
        isOpen: true,
        type: "error",
        message: ERROR_MESSAGES.COMMON_ERROR,
      });
    }
  };

  const onSearchMentor = (currentList, searchTerm) => {
    return currentList.filter((mentor) =>
      mentor.fullName?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const onDeleteMentor = async (mentorId) => {
    await accountService.deleteMentors(mentorId);
  };

  const onActiveMentor = async (mentorId, data) => {
    await userAccountService.updateUserProfile(mentorId, data);
  };

  const onFilterMentorByStatus = (currentList , status) => {
    if (status === MENTOR_STATUS.ALL) return currentList;

    return currentList.filter((mentor) => {
      return mentor.translatedStatus === status
    })
  }

  return (
    <div>
      <CustomizedTable
        type={TABLE_TYPE.MENTOR}
        getData={getMentors}
        filterData={onSearchMentor}
        onDelete={onDeleteMentor}
        onActive={onActiveMentor}
        headerTable={headerTable}
        actionItems={actionItems}
        defaultSort={"defaultCreatedDate"}
        onFilterBySelect={onFilterMentorByStatus}
        selectItems={statusItems}
      />
    </div>
  );
};

export default AdminMentorList;
