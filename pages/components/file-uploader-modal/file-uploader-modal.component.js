import styles from './file-uploader-modal.module.css';

export default function FileUploaderModal({ fileContent }) {
    return (
        <div className={styles.fileUploaderModalContainer}>
            <img src={fileContent}></img>
        </div>
    )
}