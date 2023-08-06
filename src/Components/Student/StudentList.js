import { useEffect } from "react";
import {
  useCustomAppbar,
  useFetchDepartments,
  useNotification,
} from "../../Helpers/generalHelper";
import CustomizedTable from "../../shared/components/Table/CustomizedTable";
import {
  ACTIVE_ACTION,
  DEACTIVATE_ACTION,
} from "../../shared/constants/actionType";
import {
  ERROR_MESSAGES,
  STUDENT_STATUS,
  STUDENT_TABLE,
  TABLE_ACTION,
  TABLE_TYPE,
  TRANSLATED_STUDENT_GENDER,
  TRANSLATED_STUDENT_STATUS,
} from "../../shared/constants/common";
import { accountService } from "../../Services/accountService";
import { APPBAR_TITLES } from "../../shared/constants/appbarTitles";
import { sortDataByCreatedDate } from "../../Helpers/arrayHelper";

const StudentList = () => {
  const { setNotification } = useNotification();
  const { getDepartments } = useFetchDepartments();
  const { setAppbar } = useCustomAppbar();
  setAppbar(APPBAR_TITLES.STUDENT_LIST);

  const headerTable = [
    {
      sortable: true,
      property: "fullName",
      name: STUDENT_TABLE.NAME,
    },
    {
      sortable: true,
      property: "email",
      name: STUDENT_TABLE.EMAIL,
    },
    {
      sortable: true,
      property: "translatedGender",
      name: STUDENT_TABLE.GENDER,
    },
    {
      sortable: true,
      property: "translatedStatus",
      name: STUDENT_TABLE.STATUS,
    },
  ];

  const actionItems = [
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

  useEffect(() => {
    getDepartments();
  }, []);

  const getStudents = async () => {
    try {
      let students = await accountService.getStudents();
      students = sortDataByCreatedDate(students);
      const updatedStudentList = students.map((student) => {
        const { profile } = student;
        return {
          ...profile,
          phone: profile.phone ? profile.phone : "Chưa có dữ liệu",
          translatedStatus: TRANSLATED_STUDENT_STATUS[profile.status],
          translatedGender: TRANSLATED_STUDENT_GENDER[profile.gender.toUpperCase()]
        };
      });

      return updatedStudentList;
    } catch (error) {
      setNotification({
        isOpen: true,
        type: "error",
        message: ERROR_MESSAGES.COMMON_ERROR,
      });
    }
  };

  const onSearchStudent = (currentList, searchTerm) => {
    return currentList.filter((student) => {
      return student.fullName?.toLowerCase().includes(searchTerm.toLowerCase());
    });
  };

  const onDeleteStudent = async (studentId) => {
    await accountService.updateAccountStatus(studentId, STUDENT_STATUS.INVALIDATE);
  };

  const onActiveStudent = async (studentId) => {
    await accountService.updateAccountStatus(studentId, STUDENT_STATUS.ACTIVATED);
  };

  return (
    <div>
      <CustomizedTable
        type={TABLE_TYPE.STUDENT}
        getData={getStudents}
        filterData={onSearchStudent}
        onDelete={onDeleteStudent}
        onActive={onActiveStudent}
        headerTable={headerTable}
        actionItems={actionItems}
        hideAddingAction={true}
      />
    </div>
  );
};

export default StudentList;
