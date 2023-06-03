import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { BUTTON_LABEL, SEMINAR } from "../../../shared/constants/common";
import style from "./SeminarDetail.module.scss";
import { useEffect, useState } from "react";
import { seminarService } from "../../../Services/seminarService";
import { handleTimeToDisplay } from "../../../Helpers/dateHelper";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { Button, Menu, MenuItem } from "@mui/material";
import { useCustomLoading } from "../../../Helpers/generalHelper";
import CustomizedButton from "../../../shared/components/Button/CustomizedButton";
import QRModal from "./QRModal/QRModal";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../../../Store/slices/userSlice";

const SeminarDetail = () => {
  const [data, setData] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const { setLoading } = useCustomLoading();
  const userInfo = useSelector(selectUserInfo);

  const { id } = useParams();

  useEffect(() => {
    const getSeminarDetail = async () => {
      try {
        setLoading(true);
        const seminarDetail = await seminarService.getSeminarDetail(id);

        console.log(seminarDetail);

        setData(seminarDetail);
      } catch (error) {
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

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={style.detail__container}>
      {data && (
        <div>
          <div className={style.detail__stage}>
            <Link to="/seminars">{SEMINAR.SEMINAR_LIST}</Link>
            <span>/</span>
            <span>{data.name}</span>
          </div>
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
                    <MenuItem onClick={handleClose}>
                      <img
                        src={require("../../../assets/icons/Seminar_Edit.png")}
                      />
                      <span>{SEMINAR.EDIT}</span>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
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
        </div>
      )}
    </div>
  );
};

export default SeminarDetail;
