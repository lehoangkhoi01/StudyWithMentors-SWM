import { useEffect } from "react";
import {
  useFetchDepartments,
  useNotification,
} from "../../Helpers/generalHelper";
import CustomizedTable from "../../shared/components/Table/CustomizedTable";
import {
  ACTIVE_ACTION,
  DEACTIVATE_ACTION,
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

const StaffList = () => {
  const { setNotification } = useNotification();
  const { getDepartments } = useFetchDepartments();

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
      center: true,
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
  ];

  useEffect(() => {
    getDepartments();
  }, []);

  const getStaffs = async () => {
    try {
      const staffs = await accountService.getAllStaffs();

      const updatedStaffList = staffs.map((staff) => {
        const { profile } = staff;
        return {
          ...profile,

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

  const onDeleteStaff = async (staffId) => {
    await accountService.updateAccountStatus(staffId, STAFF_STATUS.INVALIDATE);
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
