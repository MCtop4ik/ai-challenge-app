import styles from './history-card.module.css';
import React, { useState } from 'react';
import Modal from '../modal/modal.component';
import CardInfoModal from '../card-info-modal/card-info-modal.component';
import HistoryApi from '../../api/history.api';

export default function HistoryCard({ id }) {
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        HistoryApi.addHistoryCard({'id': 1, 'imagePath': 'test.png', 'pipeCount': 1, 'createdDate': new Date()});
        setShowModal(!showModal);
    };

    return (
        <div className={styles.historyCard} onClick={toggleModal}>
            <div className={styles.historyCard__information}>
                <h2 className={styles.historyCard__information_date}>Card {id}</h2>
                <h2 className={styles.historyCard__information_amount}>Card {id}</h2>
            </div>
            <div className={styles.historyCard__photo_container}>
                <img className={styles.historyCard__photo_container_photo} src="./input.png"></img>
            </div>
                <Modal show={showModal} onClose={toggleModal}>
                    <CardInfoModal id={id} />
                </Modal>
        </div>
    )
}