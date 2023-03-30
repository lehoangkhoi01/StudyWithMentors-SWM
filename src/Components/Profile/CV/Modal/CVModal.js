import { Modal, Typography } from "@mui/material";

import style from "./CVModal.module.scss";
import CustomizedButton from "../../../../shared/components/Button/CustomizedButton";
import { BUTTON_LABEL } from "../../../../shared/constants/common";

const CVModal = (props) => {
  return (
    <>
      <Modal open={props.openModal} onClose={props.onCloseModal}>
        <div className={style.modal}>
          <h1>{props.title}</h1>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
          <div className={style.modal__buttons}>
            <CustomizedButton
              type="submit"
              variant="outlined"
              color="primary600"
            >
              {BUTTON_LABEL.CANCEL}
            </CustomizedButton>
            <CustomizedButton
              type="submit"
              variant="contained"
              color="primary600"
            >
              {BUTTON_LABEL.ADD}
            </CustomizedButton>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CVModal;
