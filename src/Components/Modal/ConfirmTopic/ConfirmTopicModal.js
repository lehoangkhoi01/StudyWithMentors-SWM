import { useEffect, useState } from "react";
import style from "./ConfirmTopicModal.module.scss";
import {
  CONFIRM_TOPIC_MODAL,
  ERROR_MESSAGES,
  MODAL_ACTIVE_PROPERTY,
  OTHERS,
  TOPIC_STATUS_BACKEND,
} from "../../../shared/constants/common";
import { Modal, Typography } from "@mui/material";
import CustomizedButton from "../../../shared/components/Button/CustomizedButton";
import { topicService } from "../../../Services/topicService";
import {
  useCustomLoading,
  useNotification,
} from "../../../Helpers/generalHelper";

const ConfirmTopicModal = (props) => {
  const { setLoading } = useCustomLoading();
  const { setNotification } = useNotification();

  const [properties, setProperties] = useState({
    confirmButton: "",
    confirm: "",
  });
  const [englishType, setEnglishType] = useState();

  const onUpdateTopicStatus = async () => {
    try {
      setLoading(true);
      await topicService.updateStatus(props.existedData.id, englishType);

      props.onSuccess();

      setLoading(false);
    } catch (error) {
      setNotification({
        isOpen: true,
        type: "error",
        message: ERROR_MESSAGES.COMMON_ERROR,
      });
    }
  };

  useEffect(() => {
    switch (props.type) {
      case CONFIRM_TOPIC_MODAL.ACCEPT:
        setProperties({
          confirmButton: CONFIRM_TOPIC_MODAL.ACCEPT,
          confirm: CONFIRM_TOPIC_MODAL.ACCEPT_CONFIRM,
        });
        setEnglishType(TOPIC_STATUS_BACKEND.ACCEPTED);
        break;
      case CONFIRM_TOPIC_MODAL.REJECT:
        setProperties({
          confirmButton: CONFIRM_TOPIC_MODAL.REJECT,
          confirm: CONFIRM_TOPIC_MODAL.REJECT_CONFIRM,
        });
        setEnglishType(TOPIC_STATUS_BACKEND.REJECTED);
        break;
      case CONFIRM_TOPIC_MODAL.ARCHIVE:
        setProperties({
          confirmButton: CONFIRM_TOPIC_MODAL.ARCHIVE,
          confirm: CONFIRM_TOPIC_MODAL.ARCHIVE_CONFIRM,
        });
        setEnglishType(TOPIC_STATUS_BACKEND.ARCHIVED);
        break;
      default:
        break;
    }
  }, [props.openModal]);

  return (
    <div className={style.container}>
      <Modal open={props.openModal} onClose={props.onCloseModal}>
        <div className={style.modal}>
          <Typography marginY={3} variant="h4" color="#1a237e">
            {`${properties.confirm} ${CONFIRM_TOPIC_MODAL.TOPIC} ${props.title} ${OTHERS.THIS}?`}
          </Typography>

          <div className={style.modal__buttons}>
            <CustomizedButton
              type="submit"
              variant="text"
              color="primary600"
              onClick={props.onCloseModal}
            >
              {MODAL_ACTIVE_PROPERTY.BACK}
            </CustomizedButton>
            <CustomizedButton
              type="submit"
              variant="text"
              color="primary600"
              onClick={onUpdateTopicStatus}
            >
              {properties.confirmButton}
            </CustomizedButton>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ConfirmTopicModal;
