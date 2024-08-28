import React, { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import styles from "./camera.module.css";
import IDBApi from '../../api/idb.api';
import HistoryApi from '../../api/history.api';
import ModalControllerApi from '../../api/modal-controller.api';

export default function Camera({ onInformationModalOpen }) {
    const webcamRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        const imageID = generateRandomString(8);
        setImgSrc(imageSrc);
        IDBApi.saveImage(imageSrc, imageID).then(() => {
            HistoryApi.addHistoryCard({ 'id': 1, 'imageID': imageID, 'pipeCount': 1, 'createdDate': new Date() });
        });
    }, [webcamRef]);

    const retake = () => {
        setImgSrc(null);
    };

    const goNext = () => {
        const modalControllerApi = new ModalControllerApi();
        modalControllerApi.openInformationModal();
        onInformationModalOpen(true);
    }

    function generateRandomString(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charactersLength);
            result += characters[randomIndex];
        }
        return result;
    }

    return (
        <div className={styles.camera}>
            {imgSrc ? (
                <div className={styles.camera__title}>
                    Image Preview
                </div>
            )   :   (
                <div></div>
            )}
            {imgSrc ? (
                <img className={styles.camera__cameraPhoto} src={imgSrc} alt="webcam" />
            ) : (
                <Webcam className={styles.camera__webcam} ref={webcamRef} />
            )}
            {imgSrc ? (
                <div className={styles.camera__buttonContainer}>
                    <button className={styles.camera__buttonContainer_beautifulButton} onClick={retake}>Retake photo</button>
                    <button className={styles.camera__buttonContainer_beautifulButton} onClick={goNext}>Next</button>
                </div>
            ) : (
                <div className={styles.camera__buttonContainer_photo}>
                    <button className={styles.camera__buttonContainer_beautifulButton} onClick={capture}>
                        Make Photo
                    </button>
                </div>
            )}
        </div>
    );
};
