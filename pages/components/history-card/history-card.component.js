import styles from './history-card.module.css';
import React, { useState } from 'react';
import Modal from '../modal/modal.component';
import CardInfoModal from '../card-info-modal/card-info-modal.component';
import HistoryApi from '../../api/history.api';

export default function HistoryCard({ historyCard }) {
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        HistoryApi.addHistoryCard({ 'id': 1, 'imagePath': 'test.png', 'pipeCount': 1, 'createdDate': new Date() });
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
                <img className={styles.historyCard__photo_container_photo} src="./input.png"></img>
            </div>
            <Modal show={showModal} onClose={toggleModal}>
                <CardInfoModal historyCard={historyCard} />
            </Modal>
        </div>
    )
}