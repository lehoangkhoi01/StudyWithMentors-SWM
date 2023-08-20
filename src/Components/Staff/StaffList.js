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
  DELETE_ACTION,
  UPSERT_ACTION,
} from "../../shared/constants/actionType";
import {
  ERROR_MESSAGES,
  STAFF_STATUS,
  STAFF_TABLE,
  TABLE_ACTION,
  TABLE_TYPE,
  TRANSLATED_STAFF_STATUS,
} from "../../shared/constants/common";
import { accountService } from "../../Services/accountService";
import { APPBAR_TITLES } from "../../shared/constants/appbarTitles";
import { sortDataByCreatedDate } from "../../Helpers/arrayHelper";

const StaffList = () => {
  const { setNotification } = useNotification();
  const { getDepartments } = useFetchDepartments();
  const { setAppbar } = useCustomAppbar();
  setAppbar(APPBAR_TITLES.STAFF_LIST);

  const headerTable = [
    {
      sortable: true,
      property: "fullName",
      name: STAFF_TABLE.NAME,
    },
    {
      sortable: true,
      property: "email",
      name: STAFF_TABLE.EMAIL,
    },
    {
      sortable: true,
      center: true,
      property: "phone",
      name: STAFF_TABLE.PHONE,
    },
    {
      sortable: true,
      property: "departmentName",
      name: STAFF_TABLE.DEPARTMENT,
    },
    {
      sortable: true,
      property: "translatedStatus",
      name: STAFF_TABLE.STATUS,
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
    {
      imgSrc: require("../../assets/icons/Deactive.png"),
      label: TABLE_ACTION.DELETE,
      action: DELETE_ACTION,
      rule: (row) => {
        if (row.translatedStatus === TRANSLATED_STAFF_STATUS.WAITING) {
          return true;
        }

        return false;
      }
    },
  ];

  useEffect(() => {
    getDepartments();
  }, []);

  const getStaffs = async () => {
    try {
      let staffs = await accountService.getAllStaffs();
      staffs = sortDataByCreatedDate(staffs);
      const updatedStaffList = staffs.map((staff) => {
        const { profile, department } = staff;
        return {
          ...profile,
          departmentName: department.name ?? "Chưa có dữ liệu",
          departmentId: department.id,
          phone: profile.phone ? profile.phone : "Chưa có dữ liệu",
          translatedStatus: TRANSLATED_STAFF_STATUS[profile.status],
        };
      });

      return updatedStaffList;
    } catch (error) {
      setNotification({
        isOpen: true,
        type: "error",
        message: ERROR_MESSAGES.COMMON_ERROR,
      });
    }
  };

  const onSearchStaff = (currentList, searchTerm) => {
    return currentList.filter((staff) => {
      return staff.fullName?.toLowerCase().includes(searchTerm.toLowerCase());
    });
  };

  const onDeleteStaff = async (staffId, translatedStatus) => {
    if (translatedStatus === TRANSLATED_STAFF_STATUS.WAITING) {
      await accountService.deleteAccount(staffId);
    } else {
      await accountService.updateAccountStatus(staffId, STAFF_STATUS.INVALIDATE);
    }
  };

  const onActiveStaff = async (staffId) => {
    await accountService.updateAccountStatus(staffId, STAFF_STATUS.ACTIVATED);
  };

  return (
    <div>
      <CustomizedTable
        type={TABLE_TYPE.STAFF}
        getData={getStaffs}
        filterData={onSearchStaff}
        onDelete={onDeleteStaff}
        onActive={onActiveStaff}
        headerTable={headerTable}
        actionItems={actionItems}
      />
    </div>
  );
};

export default StaffList;
