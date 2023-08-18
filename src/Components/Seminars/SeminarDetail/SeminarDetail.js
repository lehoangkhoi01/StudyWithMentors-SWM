import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min";
import {
  BUTTON_LABEL,
  COMMON_MESSAGE,
  ERROR_MESSAGES,
  SEMINAR,
  TITLE,
  USER_STATUS,
} from "../../../shared/constants/common";
import { BREADCRUMBS_TITLE } from "../../../shared/constants/breadcrumbs";
import GlobalBreadcrumbs from "../../../shared/components/Breadcrumbs/GlobalBreadcrumbs";
import style from "./SeminarDetail.module.scss";
import { useEffect, useState } from "react";
import { seminarService } from "../../../Services/seminarService";
import { handleTimeToDisplay } from "../../../Helpers/dateHelper";
import { Avatar, Button, Menu, MenuItem, Typography } from "@mui/material";
import {
  useCustomAppbar,
  useCustomLoading,
  useNotification,
} from "../../../Helpers/generalHelper";
import CustomizedButton from "../../../shared/components/Button/CustomizedButton";
import QRModal from "./QRModal/QRModal";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../../../Store/slices/userSlice";
import ListFileDisplay from "../../../shared/components/ListFileDisplay/ListFileDisplay";
import {
  SEMINAR_DETAIL_VIEW_MODE,
  SEMINAR_STATUS,
  SYSTEM_ROLE,
} from "../../../shared/constants/systemType";
import { useHistory } from "react-router";
import { ROUTES, ROUTES_STATIC } from "../../../shared/constants/navigation";
import ConfirmationDialog from "../../../shared/components/ConfirmationDialog/ConfirmationDialog";
import DiscussionRoom from "../../DiscussionRoom/DiscussionRoom";
import { APPBAR_TITLES } from "../../../shared/constants/appbarTitles";
import moment from "moment";

const SeminarDetail = () => {
  const AUTHORIZED_ROLE_ACTION = [SYSTEM_ROLE.STAFF, SYSTEM_ROLE.ADMIN];

  const [data, setData] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openRemoveDialog, setOpenRemoveDialog] = useState(false);
  const [expandDetail, setExpandDetail] = useState(false);
  const { setLoading } = useCustomLoading();
  const { setAppbar } = useCustomAppbar();
  const { setNotification } = useNotification();
  const userInfo = useSelector(selectUserInfo);
  const history = useHistory();

  const breadcrumbsNavigate = [
    { title: BREADCRUMBS_TITLE.SEMINAR_LIST, route: ROUTES.SEMINAR_LIST },
    { title: data?.name, route: null },
  ];

  const isAuthorizedEditSeminar = (seminarDetail) => {
    if (!AUTHORIZED_ROLE_ACTION.includes(userInfo?.role)) {
      return false;
    }

    if (
      userInfo?.role === SYSTEM_ROLE.STAFF &&
      seminarDetail?.department.id !== userInfo?.departmentId
    ) {
      return false;
    }

    return true;
  };

  const { id } = useParams();

  setAppbar(APPBAR_TITLES.SEMINAR_DETAIL);

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

  const renderSeminarStatusLabel = () => {
    if (data && data.status === SEMINAR_STATUS.FUTURE) {
      return (
        <div
          className={`${style.detail__seminarStatus} ${style.detail__futureLabel}`}
        >
          {TITLE.SEMINAR_FUTURE}
        </div>
      );
    } else {
      return (
        <div
          className={`${style.detail__seminarStatus} ${style.detail__pastLabel}`}
        >
          {TITLE.SEMINAR_PAST}
        </div>
      );
    }
  };

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
        if (error.status == "500") {
          history.push(ROUTES.SERVER_ERROR);
        }
      } finally {
        setLoading(false);
      }
    };

    getSeminarDetail();
  }, []);

  return (
    <div className={style.detail__container}>
      {data && (
        <>
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
                {renderSeminarStatusLabel()}

                {isAuthorizedEditSeminar(data) && (
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
                      <MenuItem
                        onClick={() =>
                          handleNavigate(
                            ROUTES_STATIC.FEEDBACK_OVERVIEW + "/" + id
                          )
                        }
                      >
                        <img
                          src={require("../../../assets/icons/Semniar_Report.png")}
                        />
                        <span>{SEMINAR.RERORT}</span>
                      </MenuItem>
                      <MenuItem
                        onClick={() =>
                          handleNavigate(
                            ROUTES_STATIC.SEMINAR_UPDATE + "/" + id
                          )
                        }
                      >
                        <img
                          src={require("../../../assets/icons/Seminar_Edit.png")}
                        />
                        <span>{SEMINAR.EDIT}</span>
                      </MenuItem>

                      {moment(data.startTime) > Date.now() && (
                        //Not show delete menu for past event
                        <div>
                          <MenuItem onClick={onOpenRemoveDialog}>
                            <img
                              src={require("../../../assets/icons/Seminar_Delete.png")}
                            />
                            <span>{SEMINAR.DELETE}</span>
                          </MenuItem>
                        </div>
                      )}
                    </Menu>
                  </div>
                )}

                <div className={style.detail__mentorContainer}>
                  {data?.mentors?.map((mentor, index) => {
                    return (
                      <div key={mentor.id}>
                        <Avatar
                          sx={{ width: 60, height: 60 }}
                          alt={mentor.fullName}
                          src={mentor.avatarUrl}
                        />
                        {mentor.status === USER_STATUS.ACTIVATED ? (
                          <Link
                            to={`${ROUTES.CV}/${mentor.id}`}
                            key={`MENTOR_${index}`}
                            className={`${style.detail__activeMentor}`}
                          >
                            <Typography
                              className={`${style.detail__activeMentor}`}
                            >
                              {mentor.fullName}
                            </Typography>
                          </Link>
                        ) : (
                          <Typography fontSize="1.2rem">
                            {mentor.fullName}
                          </Typography>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className={style.detail__section}>
                  <Typography className={`${style.detail__subTitle}`}>
                    {SEMINAR.TIME}:
                  </Typography>
                  <div>
                    {handleTimeToDisplay(data.startTime)} đến{" "}
                    {handleTimeToDisplay(data.endTime)}
                  </div>
                </div>

                <div className={style.detail__section}>
                  <Typography className={`${style.detail__subTitle}`}>
                    {SEMINAR.LOCATION}:
                  </Typography>
                  <div>{data.location}</div>
                </div>

                <div className={style.detail__section}>
                  <Typography className={`${style.detail__subTitle}`}>
                    {SEMINAR.ORGANIZER}:
                  </Typography>
                  <div>{data.department?.name}</div>
                </div>

                <div>
                  <Typography className={`${style.detail__subTitle}`}>
                    {SEMINAR.CONTENT}:
                  </Typography>
                  {data.description ? (
                    <>
                      {data.description.length > 300 ? (
                        <>
                          <div
                            className={
                              expandDetail
                                ? `${style.detail__seminarDescription}`
                                : `${style.detail__seminarDescriptionExpand}`
                            }
                          >
                            <div
                              dangerouslySetInnerHTML={{
                                __html: data.description,
                              }}
                            ></div>
                          </div>

                          <div className={`${style.detail__expandButton}`}>
                            <Button
                              onClick={() => {
                                setExpandDetail((prev) => !prev);
                              }}
                            >
                              {expandDetail
                                ? BUTTON_LABEL.VIEW_LESS
                                : BUTTON_LABEL.VIEW_MORE}
                            </Button>
                          </div>
                        </>
                      ) : (
                        <>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: data.description,
                            }}
                          ></div>
                        </>
                      )}
                    </>
                  ) : (
                    <Typography fontStyle="italic">
                      {SEMINAR.EMPTY_DESCRIPTION}
                    </Typography>
                  )}
                </div>

                <p>
                  <Typography className={`${style.detail__subTitle}`}>
                    {SEMINAR.ATTACHED_FILE}:{" "}
                  </Typography>
                  {data.attachmentLinks?.length > 0 ? (
                    <ListFileDisplay
                      mode={SEMINAR_DETAIL_VIEW_MODE.VIEW}
                      oldItems={data.attachments}
                    />
                  ) : (
                    <Typography fontStyle="italic">
                      {SEMINAR.EMPTY_ATTACHMENTS}
                    </Typography>
                  )}
                </p>

                <div className={style.detail__buttons}>
                  {userInfo?.role !== SYSTEM_ROLE.STAFF &&
                    new Date() > new Date(data.startTime) && (
                      <CustomizedButton
                        onClick={onOpenModal}
                        variant="outlined"
                        color="primary600"
                      >
                        {BUTTON_LABEL.FEEDBACK_SEMINAR}
                      </CustomizedButton>
                    )}
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
              title="Xóa hội thảo"
              cancelLabel={BUTTON_LABEL.CANCEL}
              confirmLabel={BUTTON_LABEL.CONFIRM}
              content="Bạn có chắc muốn xóa hội thảo này không? Hành động này không thể hoàn tác"
              handleClose={onCloseRemoveDialog}
              handleSubmit={handleRemoveSeminar}
            />
          </div>

          {data.status === SEMINAR_STATUS.PAST && (
            <DiscussionRoom seminarId={id} />
          )}
        </>
      )}
    </div>
  );
};

export default SeminarDetail;
