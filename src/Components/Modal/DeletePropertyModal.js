import { Modal } from "@mui/material";
import style from "./DeletePropertyModal.module.scss";

import CustomizedButton from "../../shared/components/Button/CustomizedButton";
import { MODAL_DELETE_PROPERTY, OTHERS } from "../../shared/constants/common";

const DeletePropertyModal = (props) => {
  const { type } = props;
  
  return (
    <div className={style.container}>
      <Modal open={props.openModal} onClose={props.onCloseModal}>
        <div className={style.modal}>
          <h2>{`${
            type === MODAL_DELETE_PROPERTY.DEACTIVATE
              ? MODAL_DELETE_PROPERTY.DEACTIVATE
              : MODAL_DELETE_PROPERTY.DELETE_CONFIRM
          } ${props.title} ${OTHERS.THIS}?`}</h2>
          <p>
            {type === MODAL_DELETE_PROPERTY.DEACTIVATE
              ? MODAL_DELETE_PROPERTY.DEACTIVATE_DETAIL
              : `${props.title} ${MODAL_DELETE_PROPERTY.DELETE_DETAIL}`}
            .
          </p>
          <div className={style.modal__buttons}>
            <CustomizedButton
              type="submit"
              variant="text"
              color="primary600"
              onClick={props.onCloseModal}
            >
              {MODAL_DELETE_PROPERTY.BACK}
            </CustomizedButton>
            <CustomizedButton
              type="submit"
              variant="text"
              color="primary600"
              onClick={props.onDeleteProperty}
            >
              {type === MODAL_DELETE_PROPERTY.DEACTIVATE
                ? MODAL_DELETE_PROPERTY.DEACTIVATE
                : MODAL_DELETE_PROPERTY.DELETE}
            </CustomizedButton>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DeletePropertyModal;
