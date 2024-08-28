import Camera from "../camera/camera.component";
import styles from "./camera-button.module.css";
import { useState } from "react"
import Modal from '../modal/modal.component';
import ModalControllerApi from '../../api/modal-controller.api';


export default function CameraButton() {
    const [showCameraModal, setShowCameraModal] = useState(false);
    const [showInformationModal, setShowInformationModal] = useState(false);

    const modalControllerApi = new ModalControllerApi();

    const toggleModal = () => {
        const modalControllerApi = new ModalControllerApi();
        modalControllerApi.closeAllModals();
        setShowCameraModal(modalControllerApi.getCameraModal());
        setShowInformationModal(modalControllerApi.getInformationModal());
    };

    const openPhotoModal = () => {
        const modalControllerApi = new ModalControllerApi();
        modalControllerApi.openCameraModal();
        setShowCameraModal(modalControllerApi.getCameraModal());
        setShowInformationModal(modalControllerApi.getInformationModal());
    }

    const openInformationModal = () => {
        const modalControllerApi = new ModalControllerApi();
        modalControllerApi.openInformationModal();
        setShowCameraModal(modalControllerApi.getCameraModal());
        setShowInformationModal(modalControllerApi.getInformationModal());
    }

    return (
        <>
            <div className={styles.buttonContainer} onClick={openPhotoModal}>
                <svg xmlns="http://www.w3.org/2000/svg" className={styles.buttonContainer__icon} viewBox="0 0 512 512"><circle cx="256" cy="272" r="64" /><path d="M432 144h-59c-3 0-6.72-1.94-9.62-5l-25.94-40.94a15.52 15.52 0 00-1.37-1.85C327.11 85.76 315 80 302 80h-92c-13 0-25.11 5.76-34.07 16.21a15.52 15.52 0 00-1.37 1.85l-25.94 41c-2.22 2.42-5.34 5-8.62 5v-8a16 16 0 00-16-16h-24a16 16 0 00-16 16v8h-4a48.05 48.05 0 00-48 48V384a48.05 48.05 0 0048 48h352a48.05 48.05 0 0048-48V192a48.05 48.05 0 00-48-48zM256 368a96 96 0 1196-96 96.11 96.11 0 01-96 96z" /></svg>
                <p className={styles.buttonContainer__description}>Make Photo</p>
            </div>
            <Modal show={showCameraModal} onClose={toggleModal}>
                <Camera onInformationModalOpen={openInformationModal} />
            </Modal>
            <Modal show={showInformationModal} onClose={toggleModal}>
                <h2>Next</h2>
            </Modal>
        </>
    )
}