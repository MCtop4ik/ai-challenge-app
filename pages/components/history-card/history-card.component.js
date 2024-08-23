import styles from './history-card.module.css';
import React, { useState, useEffect } from 'react';
import Modal from '../modal/modal.component';
import CardInfoModal from '../card-info-modal/card-info-modal.component';
import HistoryApi from '../../api/history.api';
import IDBApi from '../../api/idb.api';

export default function HistoryCard({ historyCard }) {
    const [showModal, setShowModal] = useState(false);
    const [imageSrc, setImageSrc] = useState(null);

    useEffect(() => {
        let isMounted = true;
        
        const fetchImage = async () => {
            try {
                const image = await IDBApi.getImage(historyCard.imagePath);
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
    }, [historyCard.imagePath]);

    function toggleModal() {
        HistoryApi.addHistoryCard({ 'id': 1, 'imagePath': 'myImage', 'pipeCount': 1, 'createdDate': new Date() });
        setShowModal(!showModal);
    };

    return (
        <div className={styles.historyCard} onClick={toggleModal}>
            <div className={styles.historyCard__information}>
                <h2 className={styles.historyCard__information_date}>
                    {(new Date(historyCard.createdDate)).toLocaleDateString('en-US', 
                    {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}
                </h2>
                <h2 className={styles.historyCard__information_amount}>Amount: {historyCard.pipeCount}</h2>
            </div>
            <div className={styles.historyCard__photo_container}>
                <img className={styles.historyCard__photo_container_photo} src={imageSrc}></img>
            </div>
            <Modal show={showModal} onClose={toggleModal}>
                <CardInfoModal historyCard={historyCard} />
            </Modal>
        </div>
    )
}