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

const AdminMentorList = () => {
  const { getLatestSpeakerList } = useFetchSpeakerList();
  const { setNotification } = useNotification();

  const headerTable = [
    {
      sortable: true,
      center: true,
      property: "number",
      name: ADMIN_TABLE_HEADER.NUMBER,
    },
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

  const getMentors = async () => {
    try {
      const mentors = await getLatestSpeakerList();

      const updatedMentorList = mentors.map((mentor, index) => {
        return {
          ...mentor,
          number: index + 1,
          createdDate: handleTimeToDisplay(
            mentor.createdDate,
            null,
            DATE_FORMAT.DD_MM_YYYY,
            " -"
          ),
          defaultCreatedDate: mentor.createdDate,
          link: "#",
          linkName: TABLE_DETAIL.CV_MENTOR,
          translatedStatus: MENTOR_STATUS[mentor.status],
        };
      });

      return updatedMentorList;
    } catch (error) {
      console.log(error);

      setNotification({
        isOpen: true,
        type: "error",
        message: ERROR_MESSAGES.COMMON_ERROR,
      });
    }
  };

  const onSearchMentor = (currentList, searchTerm) => {
    return currentList.filter((mentor) =>
      mentor.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const onDeleteMentor = (mentorId) => {
    accountService.deleteMentors(mentorId);
  };

  const onActiveMentor = (mentorId, data) => {
    userAccountService.updateUserProfile(mentorId, data);
  };

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
      />
    </div>
  );
};

export default AdminMentorList;
