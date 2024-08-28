import styles from './file-uploader-modal.module.css';
import ModalControllerApi from '../../api/modal-controller.api';

export default function FileUploaderModal({ fileContent, onInformationModalOpen }) {

    const goNext = () => {
        const modalControllerApi = new ModalControllerApi();
        modalControllerApi.openInformationModal();
        onInformationModalOpen(true);
    }

    return (
        <div className={styles.fileUploaderModalContainer}>
            <h1 className={styles.fileUploaderModalContainer__title}>Image preview</h1>
            <img src={fileContent} className={styles.fileUploaderModalContainer__image}></img>
            <div className={styles.fileUploaderModalContainer__buttonContainer}>
                <button className={styles.fileUploaderModalContainer__buttonContainer_beautifulButton} onClick={goNext}>Next</button>
            </div>
        </div>
    )
}