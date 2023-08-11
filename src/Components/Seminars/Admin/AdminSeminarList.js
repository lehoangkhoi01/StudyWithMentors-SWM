import { useSelector } from "react-redux";
import { selectUserInfo } from "../../../Store/slices/userSlice";
import { useCustomAppbar, useNotification } from "../../../Helpers/generalHelper";
import { APPBAR_TITLES } from "../../../shared/constants/appbarTitles";
import { CONFIRM_TOPIC_MODAL, ERROR_MESSAGES, SEMINAR_TABLE, TABLE_ACTION, TABLE_TYPE, TRANSLATED_SEMINAR_STATUS } from "../../../shared/constants/common";
import { UPSERT_ACTION } from "../../../shared/constants/actionType";
import { SYSTEM_ROLE } from "../../../shared/constants/systemType";
import { seminarService } from "../../../Services/seminarService";
import CustomizedTable from "../../../shared/components/Table/CustomizedTable";

const AdminSeminarList = () => {
  const userInfo = useSelector(selectUserInfo);
  const { setNotification } = useNotification();
  const { setAppbar } = useCustomAppbar();
  setAppbar(APPBAR_TITLES.SEMINAR_LIST);

  const headerTable = [
    {
      sortable: true,
      property: "name",
      name: SEMINAR_TABLE.NAME,
    },
    {
      sortable: true,
      property: "departmentName",
      name: SEMINAR_TABLE.DEPARTMENT,
    },
    {
      sortable: true,
      property: "translatedStatus",
      name: SEMINAR_TABLE.STATUS,
    },
  ];

  const actionItems = [
    {
      imgSrc: require("../../../assets/icons/Detail.png"),
      label: CONFIRM_TOPIC_MODAL.DETAIL,
      action: UPSERT_ACTION,
    },
    {
      imgSrc: require("../../../assets/icons/Edit.png"),
      label: TABLE_ACTION.EDIT,
      action: UPSERT_ACTION,
    },
  ];

  const getSeminars = async () => {
    try {
      const filter = {
        mentorIds: userInfo?.role === SYSTEM_ROLE.MENTOR ? [userInfo.accountId] : [],
        pageIndex: 0,
        pageSize: 100,
      }

      const seminars = await seminarService.getSemniars(filter);

      let updatedSeminars = seminars.content.map((seminar) => ({
        ...seminar,
        departmentName: seminar.department.name,
        translatedStatus: TRANSLATED_SEMINAR_STATUS[seminar.status],
      }));

      console.log(updatedSeminars)

      return updatedSeminars;
    } catch (error) {
      setNotification({
        isOpen: true,
        type: "error",
        message: ERROR_MESSAGES.COMMON_ERROR,
      });
    }
  };

  const onSearchSeminar = (currentList, searchTerm) => {
    console.log(currentList);
    return currentList.filter((seminar) => {
      console.log(seminar.name)
      return seminar.name?.toLowerCase().includes(searchTerm?.toLowerCase())
    }
    );
  };

  return (
    <div>
      <CustomizedTable
        type={TABLE_TYPE.SEMINAR}
        getData={getSeminars}
        filterData={onSearchSeminar}
        headerTable={headerTable}
        actionItems={actionItems}
      />
    </div>
  );
};

export default AdminSeminarList;
