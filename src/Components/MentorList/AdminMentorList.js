import {
  ADMIN_TABLE_HEADER,
  DATE_FORMAT,
  ERROR_MESSAGES,
  TABLE_DETAIL,
} from "../../shared/constants/common";
import { handleTimeToDisplay } from "../../Helpers/dateHelper";
import { accountService } from "../../Services/accountService";
import {
  useFetchSpeakerList,
  useNotification,
} from "../../Helpers/generalHelper";
import CustomizedTable from "../../shared/components/Table/CustomizedTable";

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
      mentor.fullName.toLowerCase().includes(searchTerm)
    );
  };

  const onDeleteMentor = (mentorId) => {
    accountService.deleteMentors([mentorId]);
  };

  return (
    <div>
      <CustomizedTable
        getData={getMentors}
        onSearch={onSearchMentor}
        onDelete={onDeleteMentor}
        headerTable={headerTable}
      />
    </div>
  );
};

export default AdminMentorList;
