import { useSelector } from "react-redux";
import { selectUserInfo } from "../../../Store/slices/userSlice";
import {
  useCustomAppbar,
  useCustomLoading,
  useNotification,
} from "../../../Helpers/generalHelper";
import { APPBAR_TITLES } from "../../../shared/constants/appbarTitles";
import {
  BUTTON_LABEL,
  COMMON_MESSAGE,
  CONFIRM_TOPIC_MODAL,
  ERROR_MESSAGES,
  SEMINAR_TABLE,
  TABLE_ACTION,
  TABLE_TYPE,
  TRANSLATED_SEMINAR_STATUS,
} from "../../../shared/constants/common";
import { EXTERNAL_ACTION } from "../../../shared/constants/actionType";
import { SYSTEM_ROLE } from "../../../shared/constants/systemType";
import { seminarService } from "../../../Services/seminarService";
import CustomizedTable from "../../../shared/components/Table/CustomizedTable";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { ROUTES, ROUTES_STATIC } from "../../../shared/constants/navigation";
import { useState } from "react";
import ConfirmationDialog from "../../../shared/components/ConfirmationDialog/ConfirmationDialog";

const AdminSeminarList = () => {
  const userInfo = useSelector(selectUserInfo);
  const { setNotification } = useNotification();
  const { setAppbar } = useCustomAppbar();
  const { setLoading } = useCustomLoading();
  setAppbar(APPBAR_TITLES.SEMINAR_LIST);
  const history = useHistory();

  const [render, setRender] = useState(1);
  const [selectedSeminar, setSelectedSeminar] = useState(null);
  const [openDeleteSeminarConfirmation, setOpenDeleteSeminarConfirmation] =
    useState(false);

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
      action: EXTERNAL_ACTION,
      functionAction: (row) => {
        history.push(`${ROUTES_STATIC.SEMINAR_DETAIL}/${row.id}`);
      },
    },
    {
      imgSrc: require("../../../assets/icons/Edit.png"),
      label: TABLE_ACTION.EDIT,
      action: EXTERNAL_ACTION,
      functionAction: (row) => {
        history.push(`${ROUTES_STATIC.SEMINAR_UPDATE}/${row.id}`);
      },
    },
    {
      imgSrc: require("../../../assets/icons/Table_Remove.png"),
      label: CONFIRM_TOPIC_MODAL.DELETE,
      action: EXTERNAL_ACTION,
      functionAction: (row) => {
        console.log(row);
        setSelectedSeminar(row);
        setOpenDeleteSeminarConfirmation(true);
      },
    },
  ];

  const getSeminars = async () => {
    try {
      const filter = {
        mentorIds:
          userInfo?.role === SYSTEM_ROLE.MENTOR ? [userInfo.accountId] : [],
        pageIndex: 0,
        pageSize: 100,
      };

      const seminars = await seminarService.getSemniars(filter);

      let updatedSeminars = seminars.content.map((seminar) => ({
        ...seminar,
        departmentName: seminar.department.name,
        translatedStatus: TRANSLATED_SEMINAR_STATUS[seminar.status],
      }));

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
    return currentList.filter((seminar) => {
      return seminar.name?.toLowerCase().includes(searchTerm?.toLowerCase());
    });
  };

  const overdrivedAddingAcion = () => {
    history.push(ROUTES.SEMINAR_CREATE);
  };

  const onDeleteSeminar = async () => {
    setLoading(true);
    try {
      await seminarService.removeSeminar(selectedSeminar.id);
      setNotification({
        isOpen: true,
        type: "success",
        message: COMMON_MESSAGE.REMOVE_SEMINAR_SUCCESS,
      });
    } catch (error) {
      setNotification({
        isOpen: true,
        type: "error",
        message: ERROR_MESSAGES.COMMON_ERROR,
      });
    } finally {
      setOpenDeleteSeminarConfirmation(false);
      setRender((prevValue) => prevValue + 1);
      setLoading(false);
    }
  };

  return (
    <div>
      <CustomizedTable
        type={TABLE_TYPE.SEMINAR}
        getData={getSeminars}
        filterData={onSearchSeminar}
        headerTable={headerTable}
        actionItems={actionItems}
        overdrivedAddingAcion={overdrivedAddingAcion}
        key={render}
      />

      {openDeleteSeminarConfirmation && selectedSeminar && (
        <ConfirmationDialog
          open={openDeleteSeminarConfirmation}
          title="Xóa hội thảo"
          cancelLabel={BUTTON_LABEL.CANCEL}
          confirmLabel={BUTTON_LABEL.CONFIRM}
          content={`Bạn có chắc muốn xóa hội thảo ${selectedSeminar?.name} không? Hành động này không thể hoàn tác`}
          handleClose={() => {
            setOpenDeleteSeminarConfirmation(false);
            setSelectedSeminar(null);
          }}
          handleSubmit={onDeleteSeminar}
        />
      )}
    </div>
  );
};

export default AdminSeminarList;
