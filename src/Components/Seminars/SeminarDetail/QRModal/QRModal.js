import { Modal } from "@mui/material";
import style from "./QRModal.module.scss";
import QRCode from "react-qr-code";
import { QR_TEXT } from "../../../../shared/constants/common";
import { Link } from "react-router-dom/cjs/react-router-dom";

const QRModal = (props) => {
  const hostname = window.location.host;

  return (
    <div className={style.container}>
      <Modal open={props.openModal} onClose={props.onCloseModal}>
        <div className={style.modal}>
          <h2>{QR_TEXT.FEEDBACK_SEMINAR}</h2>
          <QRCode
            size={256}
            value={hostname + `/seminar-feedback/${props.seminarId}`}
          />
          <p>{QR_TEXT.OR_THIS_LINK}</p>

          <Link
            to={`/seminar-feedback/${props.seminarId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {window.location.host}/seminar-feedback/${props.seminarId}
          </Link>
        </div>
      </Modal>
    </div>
  );
};

export default QRModal;
