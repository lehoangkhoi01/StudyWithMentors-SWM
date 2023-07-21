import React, { useState, useCallback, useRef, useEffect } from "react";
import ReactCrop from "react-image-crop";

import "react-image-crop/dist/ReactCrop.css";
import style from "./ConfirmImage.module.scss";
import { Modal } from "@mui/material";
import { resourceService } from "../../../Services/resourceService";
import {
  BUTTON_LABEL,
  CROP_IMAGE,
  ERROR_MESSAGES,
} from "../../../shared/constants/common";
import CustomizedButton from "../../../shared/components/Button/CustomizedButton";
import {
  useCustomLoading,
  useNotification,
} from "../../../Helpers/generalHelper";

const ConfirmImage = (props) => {
  const [upImg, setUpImg] = useState();
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState({
    unit: "%",
    width: 50,
    x: 25,
    y: 25,
    aspect: 1,
  });
  const [completedCrop, setCompletedCrop] = useState(null);

  const { setLoading } = useCustomLoading();
  const { setNotification } = useNotification();

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  const onConfirm = (canvas, crop) => {
    if (!crop || !canvas) {
      return;
    }

    try {
      setLoading(true);

      canvas.toBlob(async (blob) => {
        let formData = new FormData();
        formData.append("image", blob);
        const res = await resourceService.uploadImage(formData);

        props.onUpdateImage(res);
      }, "image/jpeg");
    } catch (error) {
      setNotification({
        isOpen: true,
        type: "error",
        message: ERROR_MESSAGES.COMMON_ERROR,
      });
    }
  };

  useEffect(() => {
    if (!props.croppingImage) return;

    const files = props.croppingImage.files;
    if (files && files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setUpImg(reader.result));
      reader.readAsDataURL(files[0]);
    }
  }, [props.croppingImage]);

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );
  }, [completedCrop]);

  const closeConfirmImage = () => {
    props.onCloseModal();
  };

  return (
    <div className={style.container}>
      <Modal open={props.openModal} onClose={props.onCloseModal}>
        <>
          <div className={`${style.confirmImage}`}>
            <img
              src={require("../../../assets/icons/Cancel.png")}
              alt="cancel"
              className={`${style.confirmImage__cancelIcon}`}
              onClick={closeConfirmImage}
            />

            <h1>{CROP_IMAGE.ADJUST_AVATAR}</h1>
            <hr />
            <ReactCrop
              src={upImg}
              onImageLoaded={onLoad}
              crop={crop}
              keepSelection={true}
              onChange={(c) => setCrop(c)}
              onComplete={(c) => setCompletedCrop(c)}
              className={`${style.confirmImage__crop}`}
            />
            <h2>{CROP_IMAGE.AVATAR_AFTER_ADJUST}</h2>
            <div className={`${style.confirmImage__cropedImgage}`}>
              <canvas ref={previewCanvasRef} />
            </div>
            <CustomizedButton
              onClick={() => onConfirm(previewCanvasRef.current, completedCrop)}
              className={`${style.confirmImage__button}`}
              variant="contained"
              disabled={!completedCrop?.width || !completedCrop?.height}
              color="primary600"
            >
              {BUTTON_LABEL.SAVE}
            </CustomizedButton>
          </div>
        </>
      </Modal>
    </div>
  );
};

export default ConfirmImage;
