import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import {
  BUTTON_LABEL,
  COMMON_MESSAGE,
  ERROR_MESSAGES,
  SEMINAR,
} from "../../../shared/constants/common";
import style from "./SeminarDetail.module.scss";
import { useEffect, useState } from "react";
import { seminarService } from "../../../Services/seminarService";
import { handleTimeToDisplay } from "../../../Helpers/dateHelper";
import { Button, Menu, MenuItem } from "@mui/material";
import {
  useCustomLoading,
  useNotification,
} from "../../../Helpers/generalHelper";
import CustomizedButton from "../../../shared/components/Button/CustomizedButton";
import QRModal from "./QRModal/QRModal";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../../../Store/slices/userSlice";
import ListFileDisplay from "../../../shared/components/ListFileDisplay/ListFileDisplay";
import { SEMINAR_DETAIL_VIEW_MODE } from "../../../shared/constants/systemType";
import { useHistory } from "react-router";
import { ROUTES, ROUTES_STATIC } from "../../../shared/constants/navigation";
import { BREADCRUMBS_TITLE } from "../../../shared/constants/breadcrumbs";
import GlobalBreadcrumbs from "../../../shared/components/Breadcrumbs/GlobalBreadcrumbs";
import ConfirmationDialog from "../../../shared/components/ConfirmationDialog/ConfirmationDialog";

const SeminarDetail = () => {
  const [data, setData] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openRemoveDialog, setOpenRemoveDialog] = useState(false);
  const { setLoading } = useCustomLoading();
  const { setNotification } = useNotification();
  const userInfo = useSelector(selectUserInfo);
  const history = useHistory();

  const breadcrumbsNavigate = [
    { title: BREADCRUMBS_TITLE.SEMINAR_LIST, route: ROUTES.SEMINAR_LIST },
    { title: data?.name, route: null },
  ];

  const { id } = useParams();

  useEffect(() => {
    const getSeminarDetail = async () => {
      try {
        setLoading(true);
        const seminarDetail = await seminarService.getSeminarDetail(id);
        setData(seminarDetail);
      } catch (error) {
        if (error?.status == "404") {
          history.push(ROUTES.NOT_FOUND);
        }
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getSeminarDetail();
  }, []);

  const onOpenModal = () => {
    setOpenModal(true);
  };

  const onCloseModal = () => {
    setOpenModal(false);
  };

  const onOpenRemoveDialog = () => {
    setOpenRemoveDialog(true);
  };

  const onCloseRemoveDialog = () => {
    setOpenRemoveDialog(false);
  };

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleRemoveSeminar = async () => {
    setLoading(true);
    try {
      await seminarService.removeSeminar(id);
      setNotification({
        isOpen: true,
        type: "success",
        message: COMMON_MESSAGE.REMOVE_SEMINAR_SUCCESS,
      });
      history.push(ROUTES.SEMINAR_LIST);
    } catch (error) {
      console.log(error);
      setNotification({
        isOpen: true,
        type: "error",
        message: ERROR_MESSAGES.COMMON_ERROR,
      });
      if (error?.status == "500") {
        history.push(ROUTES.SERVER_ERROR);
      }
    } finally {
      setOpenRemoveDialog(false);
      setLoading(false);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (route) => {
    history.push(route);
  };

  return (
    <div className={style.detail__container}>
      {data && (
        <div>
          <GlobalBreadcrumbs navigate={breadcrumbsNavigate} />
          <div className={style.detail__content}>
            <img
              className={style.detail__image}
              src={
                data.imageLink
                  ? data.imageLink
                  : require("../../../assets/default-cover.jpg")
              }
            />
            <div className={style.detail__information}>
              <h1 className={style.detail__title}>{data.name}</h1>
              {userInfo?.role === "STAFF" && (
                <div className={style.detail__burger}>
                  <Button
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                  >
                    <img
                      src={require("../../../assets/icons/Edit_Semniar.png")}
                    />
                  </Button>
                  <Menu
                    id="demo-positioned-menu"
                    aria-labelledby="demo-positioned-button"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    className={style.detail__dropdown}
                  >
                    <MenuItem onClick={handleClose}>
                      <img
                        src={require("../../../assets/icons/Semniar_Report.png")}
                      />
                      <span>{SEMINAR.RERORT}</span>
                    </MenuItem>
                    <MenuItem
                      onClick={() =>
                        handleNavigate(ROUTES_STATIC.SEMINAR_UPDATE + "/" + id)
                      }
                    >
                      <img
                        src={require("../../../assets/icons/Seminar_Edit.png")}
                      />
                      <span>{SEMINAR.EDIT}</span>
                    </MenuItem>
                    <MenuItem onClick={onOpenRemoveDialog}>
                      <img
                        src={require("../../../assets/icons/Seminar_Delete.png")}
                      />
                      <span>{SEMINAR.DELETE}</span>
                    </MenuItem>
                  </Menu>
                </div>
              )}

              <p>
                <strong>{SEMINAR.AUTHOR}:</strong>{" "}
                {data.mentors.map(
                  (mentor, index) =>
                    `${mentor.fullName}${
                      data.mentors.length - 1 !== index ? ", " : ""
                    }`
                )}
              </p>
              <p>
                <strong>{SEMINAR.TIME}: </strong>
                {handleTimeToDisplay(data.startTime)}
              </p>
              <p>
                <strong>{SEMINAR.LOCATION}: </strong> {data.location}
              </p>
              <p>
                <strong>{SEMINAR.ORGANIZER}: </strong> {data.department?.name}
              </p>
              <div>
                <p>
                  <strong>{SEMINAR.CONTENT}: </strong>
                </p>
                <ul>
                  <li>{data.description}</li>
                </ul>
              </div>
              <p>
                <strong>{SEMINAR.ATTACHED_FILE}: </strong>
                <ListFileDisplay
                  mode={SEMINAR_DETAIL_VIEW_MODE.VIEW}
                  oldItems={data.attachmentLinks}
                />
              </p>
              <div className={style.detail__buttons}>
                {userInfo?.role === "STUDENT" && (
                  <CustomizedButton variant="outlined" color="primary600">
                    {BUTTON_LABEL.SUBCRIBE_SEMNIAR}
                  </CustomizedButton>
                )}
                <CustomizedButton
                  onClick={onOpenModal}
                  variant="outlined"
                  color="primary600"
                >
                  {BUTTON_LABEL.FEEDBACK_SEMINAR}
                </CustomizedButton>
              </div>
            </div>
          </div>
          <QRModal
            seminarId={data.id}
            openModal={openModal}
            onCloseModal={onCloseModal}
          />
          <ConfirmationDialog
            open={openRemoveDialog}
            title="Xóa sự kiện"
            content="Bạn có chắc muốn xóa sự kiện này không? Hành động này không thể hoàn tác"
            handleClose={onCloseRemoveDialog}
            handleSubmit={handleRemoveSeminar}
          />
        </div>
      )}
    </div>
  );
};

export default SeminarDetail;
