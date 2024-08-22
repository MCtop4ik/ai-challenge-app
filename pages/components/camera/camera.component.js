import React, { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";

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
        <div className="container">
            {imgSrc ? (
                <img src={imgSrc} alt="webcam" />
            ) : (
                <Webcam height={600} width={600} ref={webcamRef} />
            )}
            <div className="btn-container">
                {imgSrc ? (
                    <button onClick={retake}>Retake photo</button>
                ) : (
                    <button onClick={capture}>Capture photo</button>
                )}
            </div>
        </div>
    );
};
