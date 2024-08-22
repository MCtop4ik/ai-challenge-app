import React, { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import styles from "./camera.module.css";

export default function Camera() {
    const webcamRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
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
                        {/* <svg xmlns="http://www.w3.org/2000/svg" color={"white"} viewBox="0 0 512 512"><path d="M350.54 148.68l-26.62-42.06C318.31 100.08 310.62 96 302 96h-92c-8.62 0-16.31 4.08-21.92 10.62l-26.62 42.06C155.85 155.23 148.62 160 140 160H80a32 32 0 00-32 32v192a32 32 0 0032 32h352a32 32 0 0032-32V192a32 32 0 00-32-32h-59c-8.65 0-16.85-4.77-22.46-11.32z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" /><circle cx="256" cy="272" r="80" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32" /><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M124 158v-22h-24v22" /></svg> */}
                    </button>
                )}
            </div>
        </div>
    );
};
