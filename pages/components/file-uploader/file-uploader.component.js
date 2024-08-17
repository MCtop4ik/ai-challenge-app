import styles from "./file-uploader.module.css";
import React, { useRef } from 'react';

export default function FileUploader() {
    const fileInputRef = useRef(null);

    const handleClick = () => {
      fileInputRef.current.click();
    };
  
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      console.log('Selected file:', file);
    };

    return (
        <>
            <div className={styles.buttonsContainer__button} onClick={handleClick}>
                <svg xmlns="http://www.w3.org/2000/svg" className={styles.buttonsContainer__button_icon} viewBox="0 0 512 512"><path d="M376 160H272v153.37l52.69-52.68a16 16 0 0122.62 22.62l-80 80a16 16 0 01-22.62 0l-80-80a16 16 0 0122.62-22.62L240 313.37V160H136a56.06 56.06 0 00-56 56v208a56.06 56.06 0 0056 56h240a56.06 56.06 0 0056-56V216a56.06 56.06 0 00-56-56zM272 48a16 16 0 00-32 0v112h32z" /></svg>
                <p className={styles.buttonsContainer__button_description}>Load Photo</p>
            </div>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
        </>
    )
}