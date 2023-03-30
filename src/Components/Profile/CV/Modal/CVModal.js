import { Modal } from "@mui/material";

import style from "./CVModal.module.scss";
import CustomizedButton from "../../../../shared/components/Button/CustomizedButton";
import {
  BUTTON_LABEL,
  PLACE_HOLDER,
} from "../../../../shared/constants/common";
import CustomizedTextField from "../../../../shared/components/TextField/CustomizedTextField";

const CVModal = (props) => {
  return (
    <>
      <Modal open={props.openModal} onClose={props.onCloseModal}>
        <div className={style.modal}>
          <img
            className={style.modal__cancel}
            src={require("../../../../assets/icons/Cancel.png")}
          />
          <h1>{props.title}</h1>
          <CustomizedTextField
            className={style.modal__input}
            inputId="fullname"
            name={"Mô tả"}
            placeholder={PLACE_HOLDER.DEFAULT_NAME}
            required={false}
            multiline={true}
            type={"text"}
          />
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
