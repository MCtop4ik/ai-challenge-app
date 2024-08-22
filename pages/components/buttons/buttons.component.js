import styles from './buttons.module.css';
import FileUploader from '../file-uploader/file-uploader.component';
import CameraButton from '../camera-button/camera-button.component';

export default function Buttons() {
    return (
        <div className={styles.buttonsContainer}>
            <div className={styles.buttonsContainer__button}>
                <CameraButton />
            </div>
            <div className={styles.buttonsContainer__button}>
                <FileUploader />
            </div>
        </div>
    )
}