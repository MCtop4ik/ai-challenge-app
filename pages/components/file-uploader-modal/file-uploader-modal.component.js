import styles from './file-uploader-modal.module.css';

export default function FileUploaderModal({ fileContent }) {
    return (
        <div className={styles.fileUploaderModalContainer}>
            <h1 className={styles.fileUploaderModalContainer__title}>Image preview</h1>
            <img src={fileContent} className={styles.fileUploaderModalContainer__image}></img>
            <div className={styles.fileUploaderModalContainer__buttonContainer}>
                <button className={styles.fileUploaderModalContainer__buttonContainer_beautifulButton}>Next</button>
            </div>
        </div>
    )
}