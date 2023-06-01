import { Modal } from "@mui/material";
import style from "./QRModal.module.scss";
import QRCode from "react-qr-code";
import { QR_TEXT } from "../../../../shared/constants/common";

const QRModal = (props) => {
  return (
    <div className={style.container}>
      <Modal open={props.openModal} onClose={props.onCloseModal}>
        <div className={style.modal}>
          <h2>{QR_TEXT.FEEDBACK_SEMINAR}</h2>
          <QRCode size={256} value={"https://docs.google.com/forms"} />
          <p>{QR_TEXT.OR_THIS_LINK}</p>

          <a
            href="https://docs.google.com/forms"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://docs.google.com/forms
          </a>
        </div>
      </Modal>
    </div>
  );
};

export default QRModal;
