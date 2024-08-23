import React, { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import styles from "./camera.module.css";

export default function Camera() {
    const webcamRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
        IndexedDBService.saveImage(imageSrc).then(() => {
            alert('Saved in idb');
        });
    }, [webcamRef]);

    const retake = () => {
        setImgSrc(null);
    };

    return (
        <div className={styles.camera}>
            {imgSrc ? (
                <img src={imgSrc} alt="webcam" />
            ) : (
                <Webcam className={styles.camera__webcam} ref={webcamRef} />
            )}
            <div className={styles.camera__buttonContainer}>
                {imgSrc ? (
                    <button className={styles.camera__buttonContainer_beautifulButton} onClick={retake}>Retake photo</button>
                ) : (
                    <button className={styles.camera__buttonContainer_beautifulButton} onClick={capture}>
                        Make Photo
                    </button>
                )}
            </div>
        </div>
    );
};
