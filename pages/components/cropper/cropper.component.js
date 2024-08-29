import React, { useState, useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import styles from './cropper.module.css';
import Modal from "../modal/modal.component";

export default function RealCropper({ imageSrc }) {
  const [cropData, setCropData] = useState("#");
  const [showCroppedModal, setShowCroppedModal] = useState(false);
  const cropperRef = useRef(null);

  const getCropData = () => {
    if (cropperRef.current && cropperRef.current.cropper) {
      const croppedCanvas = cropperRef.current.cropper.getCroppedCanvas();
      setCropData(croppedCanvas.toDataURL());
      toggleCroppedModal();
    }
  };

  const toggleCroppedModal = () => {
    setShowCroppedModal(!showCroppedModal);
  }

  return (
    <div className={styles.cropperContainer}>
      <div className={styles.cropperWrapper}>
        <Cropper
          ref={cropperRef}
          className={styles.cropper}
          zoomTo={0.5}
          initialAspectRatio={1}
          preview=".img-preview"
          src={imageSrc}
          viewMode={1}
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          background={false}
          responsive={true}
          autoCropArea={1}
          checkOrientation={false}
          guides={true}
        />
      </div>
      <div className={styles.resultWrapper}>
        <button className={styles.cropButton} onClick={getCropData}>
          Crop Image
        </button>
        <Modal show={showCroppedModal} onClose={toggleCroppedModal}>
          {cropData && <img className={styles.croppedImage} src={cropData} alt="cropped" />}
        </Modal>
      </div>
    </div>
  );
}