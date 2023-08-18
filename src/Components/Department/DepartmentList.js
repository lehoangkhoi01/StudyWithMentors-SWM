import { sortDataByCreatedDate } from "../../Helpers/arrayHelper";
import { useCustomAppbar, useNotification } from "../../Helpers/generalHelper";
import { departmentService } from "../../Services/departmentService";
import CustomizedTable from "../../shared/components/Table/CustomizedTable";
import {
  DELETE_ACTION,
  UPSERT_ACTION,
} from "../../shared/constants/actionType";
import { APPBAR_TITLES } from "../../shared/constants/appbarTitles";
import {
  ADMIN_TABLE_HEADER,
  ERROR_MESSAGES,
  MENTOR_STATUS,
  TABLE_ACTION,
  TABLE_TYPE,
} from "../../shared/constants/common";

const DepartmentList = () => {
  const { setNotification } = useNotification();
  const { setAppbar } = useCustomAppbar();
  setAppbar(APPBAR_TITLES.DEPARTMENT_LIST);

  const headerTable = [
    {
      sortable: true,
      property: "name",
      name: ADMIN_TABLE_HEADER.DEPARTMENT_NAME,
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
      label: TABLE_ACTION.DELETE,
      action: DELETE_ACTION,
    },
  ];

  const getDepartments = async () => {
    try {
      let departments = await departmentService.getDepartments();
      departments = sortDataByCreatedDate(departments);
      const updatedDepartments = departments.map((department) => ({
        ...department,
        translatedStatus: MENTOR_STATUS.ACTIVATED,
      }));

      return updatedDepartments;
    } catch (error) {
      setNotification({
        isOpen: true,
        type: "error",
        message: ERROR_MESSAGES.COMMON_ERROR,
      });
    }
  };

  const onSearchDepartment = (currentList, searchTerm) => {
    return currentList.filter((department) =>
      department.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const onDeleteDepartment = async (fieldId) => {
    await departmentService.deleteDepartment(fieldId[0]);
  };
  return (
    <div>
      <CustomizedTable
        type={TABLE_TYPE.DEPARTMENT}
        getData={getDepartments}
        filterData={onSearchDepartment}
        onDelete={onDeleteDepartment}
        headerTable={headerTable}
        actionItems={actionItems}
      />
    </div>
  );
};

export default DepartmentList;
