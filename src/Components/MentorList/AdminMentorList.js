import {
  ADMIN_TABLE_HEADER,
  ERROR_MESSAGES,
  MENTOR_STATUS,
  TABLE_ACTION,
  TABLE_DETAIL,
  TABLE_TYPE,
} from "../../shared/constants/common";
import { accountService } from "../../Services/accountService";
import {
  useCustomAppbar,
  useCustomLoading,
  useFetchSpeakerList,
  useNotification,
} from "../../Helpers/generalHelper";
import CustomizedTable from "../../shared/components/Table/CustomizedTable";
import { userAccountService } from "../../Services/userAccountService";
import {
  ACTIVE_ACTION,
  DEACTIVATE_ACTION,
  UPSERT_ACTION,
  SEND_INVITATION,
  DELETE_ACTION,
} from "../../shared/constants/actionType";
import { APPBAR_TITLES } from "../../shared/constants/appbarTitles";
import { useState } from "react";
import ConfirmationDialog from "../../shared/components/ConfirmationDialog/ConfirmationDialog";
import { sendMailService } from "../../Services/sendMailService";
import { sortDataByCreatedDate } from "../../Helpers/arrayHelper";

const AdminMentorList = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [mentorAccount, setMentorAccount] = useState(null);
  const { getLatestSpeakerList } = useFetchSpeakerList();
  const { setNotification } = useNotification();
  const { setAppbar } = useCustomAppbar();
  const { setLoading } = useCustomLoading();

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
      imgSrc: require("../../assets/icons/Resend.png"),
      label: "Gửi lại thư mời",
      action: SEND_INVITATION,
      functionAction: function (account) {
        setOpenDialog(true);
        setMentorAccount(account);
      },
      rule: (row) => {
        if (row.translatedStatus === MENTOR_STATUS.WAITING) {
          return true;
        }
        return false;
      },
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
        if (row.translatedStatus === MENTOR_STATUS.WAITING) {
          return true;
        }

        return false;
      },
    },
  ];

  const statusItems = [
    { name: MENTOR_STATUS.ALL },
    { name: MENTOR_STATUS.ACTIVATED },
    { name: MENTOR_STATUS.INVALIDATE },
    { name: MENTOR_STATUS.WAITING },
  ];

  const getMentors = async () => {
    try {
      const mentors = await getLatestSpeakerList();

      const updatedMentorList = mentors.map((mentor) => {
        return {
          ...mentor,
          link: `/cv/${mentor.id}`,
          linkName: TABLE_DETAIL.CV_MENTOR,
          translatedStatus: MENTOR_STATUS[mentor.status],
          phoneNum: mentor.phoneNum ? mentor.phoneNum : "Chưa có",
        };
      });

      const sortedMentorList = sortDataByCreatedDate(updatedMentorList);

      return sortedMentorList;
    } catch (error) {
      setNotification({
        isOpen: true,
        type: "error",
        message: ERROR_MESSAGES.COMMON_ERROR,
      });
    }
  };

  const onSearchMentor = (currentList, searchTerm, status) => {
    if (status === MENTOR_STATUS.ALL) return currentList.filter(
      (mentor) =>
        mentor.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mentor.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return currentList.filter((mentor) => (
      (mentor.translatedStatus === status &&
        (mentor.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          mentor.email.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    ))
  };

  const onDeleteMentor = async (mentorId, translatedStatus) => {
    if (translatedStatus === MENTOR_STATUS.WAITING) {
      await accountService.deleteAccount(mentorId);
    } else {
      await accountService.deleteMentors(mentorId);
    }
  };

  const onActiveMentor = async (mentorId, data) => {
    await userAccountService.updateUserProfile(mentorId, data);
  };

  const onFilterMentorByStatus = (currentList, status, searchTerm) => {
    if (status === MENTOR_STATUS.ALL) return currentList.filter(
      (mentor) =>
        mentor.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mentor.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return currentList.filter((mentor) => (
      (mentor.translatedStatus === status &&
        (mentor.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          mentor.email.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    ))
  };

  const handleSubmitResentInvitation = async () => {
    try {
      setLoading(true);
      await sendMailService.sendMentorInvitation(mentorAccount.id);
      setNotification({
        isOpen: true,
        type: "success",
        message: "Gửi thư mời thành công",
      });
      setOpenDialog(false);
    } catch (error) {
      setNotification({
        isOpen: true,
        type: "error",
        message: ERROR_MESSAGES.COMMON_ERROR,
      });
    } finally {
      setLoading(false);
    }
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
        onFilterBySelect={onFilterMentorByStatus}
        selectItems={statusItems}
      />

      {openDialog && (
        <ConfirmationDialog
          open={openDialog}
          title="Gửi thư mời"
          confirmLabel="Xác nhận"
          cancelLabel="Trở lại"
          content={`Gửi thư mời tham gia vào hệ thống đến email ${mentorAccount?.email}`}
          handleClose={() => setOpenDialog(false)}
          handleSubmit={handleSubmitResentInvitation}
        />
      )}
    </div>
  );
};

export default AdminMentorList;
