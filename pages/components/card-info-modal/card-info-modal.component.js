import styles from './card-info-modal.module.css';
import React, { useState, useEffect } from 'react';
import IDBApi from '../../api/idb.api';

export default function CardInfoModal({ historyCard, onInformationButtonClick }) {
    const [imageSrc, setImageSrc] = useState(null);

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
    
    function openInformationModal() {
        onInformationButtonClick(true)
    }

    return (
        <div className={styles.cardInfoModalContainer}>
            <img className={styles.cardInfoModalContainer__image} src={imageSrc}></img>
            <div className={styles.cardInfoModalContainer__description}>
                <p className={styles.cardInfoModalContainer__description_pipeCount}>
                    <span>Amount of Pipes: </span>
                    <strong>{historyCard.pipeCount}</strong>
                </p>
                <p className={styles.cardInfoModalContainer__description_createdDate}>
                    <span>Created On: </span>
                    <strong>{(new Date(historyCard.createdDate)).toLocaleDateString('en-US',
                        {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })
                    }</strong>
                </p>
                <button className={styles.cardInfoModalContainer__cropButton} onClick={openInformationModal}>Open</button>
            </div>
        </div>
    )
}