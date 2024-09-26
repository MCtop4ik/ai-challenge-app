import React, { useState, useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import styles from './cropper.module.css';
import Modal from "../modal/modal.component";

export default function RealCropper({ imageSrc }) {
  const [cropData, setCropData] = useState("#");
  const [modelData, setModelData] = useState("#");
  const [showCroppedModal, setShowCroppedModal] = useState(false);
  const cropperRef = useRef(null);

  const getCropData = async () => {
    if (cropperRef.current && cropperRef.current.cropper) {
      const croppedCanvas = cropperRef.current.cropper.getCroppedCanvas();
      setCropData(croppedCanvas.toDataURL());
      await detect();
      toggleCroppedModal();
    }
  };

  const detect = async () => {
    const response = await fetch('/api/model.api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',  // Setting content type for JSON
      },
      body: JSON.stringify({ 'detectImage': cropData })  // Convert cropData to a JSON string
    });

    if (response.ok) {
      const data = await response.json();
      const buf = Buffer.from(data.message);
      const base64Image = buf.toString('base64');
      const imageSrc = `data:image/png;base64,${base64Image}`;
      setModelData(imageSrc);
    } else {
      console.error('Error:', response.status, response.statusText);
    }
  }

  const toggleCroppedModal = () => {
    setShowCroppedModal(!showCroppedModal);
  }

  return (
    <div className={styles.cropperContainer}>
      <div className={styles.cropperContainer__cropperWrapper}>
        <Cropper
          ref={cropperRef}
          className={styles.cropperContainer__cropper}
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
      <div className={styles.cropperContainer__resultWrapper}>
        <button className={styles.cropperContainer__cropButton} onClick={getCropData}>
          Analyze
        </button>
        <Modal show={showCroppedModal} onClose={toggleCroppedModal}>
          <div className={styles.cropperContainer}>
            <h1 className={styles.cropperContainer__title}>Analyzed image</h1>
            <h2 className={styles.cropperContainer__countPipes}>Pipes Count: unknown</h2>
            <div className={styles.cropperContainer__wrapper}>
              {modelData && <img className={styles.cropperContainer__croppedImage} src={modelData} alt="cropped" />}
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}