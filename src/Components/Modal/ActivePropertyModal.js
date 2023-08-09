import { Modal, Typography } from "@mui/material";
import style from "./ActivePropertyModal.module.scss";

import CustomizedButton from "../../shared/components/Button/CustomizedButton";
import { MODAL_ACTIVE_PROPERTY, OTHERS } from "../../shared/constants/common";

const ActivePropertyModal = (props) => {
  return (
    <div className={style.container}>
      <Modal open={props.openModal} onClose={props.onCloseModal}>
        <div className={style.modal}>
          <Typography
            marginY={3}
            fontWeight={700}
            fontSize="2rem"
            textAlign="center"
            color="#283493"
          >
            {`${MODAL_ACTIVE_PROPERTY.ACTIVE_CONFIRM} ${props.title} ${OTHERS.THIS}?`}
          </Typography>
          <p>{` ${MODAL_ACTIVE_PROPERTY.ACTIVE_DETAIL}`}</p>
          <div className={style.modal__buttons}>
            <CustomizedButton
              type="submit"
              variant="outlined"
              color="primary600"
              onClick={props.onCloseModal}
            >
              {MODAL_ACTIVE_PROPERTY.BACK}
            </CustomizedButton>
            <CustomizedButton
              type="submit"
              variant="contained"
              color="primary600"
              onClick={props.onActive}
            >
              {MODAL_ACTIVE_PROPERTY.ACTIVE}
            </CustomizedButton>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ActivePropertyModal;
