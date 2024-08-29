import styles from './history-card.module.css';
import React, { useState, useEffect } from 'react';
import Modal from '../modal/modal.component';
import IDBApi from '../../api/idb.api';
import ModalControllerApi from '../../api/modal-controller.api';
import FileInfoModal from '../file-info-modal/file-info-modal.component';

export default function HistoryCard({ historyCard }) {
    const [showModal, setShowModal] = useState(false);
    const [imageSrc, setImageSrc] = useState(null);

    const [showInformationModal, setShowInformationModal] = useState(false);

    useEffect(() => {
        let isMounted = true;
        
        const fetchImage = async () => {
            try {
                const image = await IDBApi.getImage(historyCard.imageID);
                if (isMounted) {
                    setImageSrc(image);
                }
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        };

        fetchImage();
        return () => {
            isMounted = false;
        };
    }, [historyCard.imageID]);

    const openInformationModal = () => {
        console.log('wewe hst')
        const modalControllerApi = new ModalControllerApi();
        modalControllerApi.openInformationModal();
        setShowInformationModal(modalControllerApi.getInformationModal());
    }

    function toggleModal() {
        console.log('wewe toggle')
        const modalControllerApi = new ModalControllerApi();
        modalControllerApi.closeAllModals();
        setShowInformationModal(modalControllerApi.getInformationModal());
    };

    return (
        <div className={styles.historyCard}>
            <div className={styles.historyCard__information} onClick={openInformationModal}>
                <h2 className={styles.historyCard__information_date}>
                    {(new Date(historyCard.createdDate)).toLocaleDateString('en-US', 
                    {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}
                </h2>
                {/* <h2 className={styles.historyCard__information_amount}>Amount: {historyCard.pipeCount}</h2> */}
                <button className={styles.historyCard__cropButton} onClick={openInformationModal}>Analyze</button>
            </div>
            <div className={styles.historyCard__photo_container}>
                <img className={styles.historyCard__photo_container_photo} src={imageSrc}></img>
            </div>
            <Modal show={showInformationModal} onClose={toggleModal}>
                <FileInfoModal id={historyCard.id}></FileInfoModal>
            </Modal>
        </div>
    )
}