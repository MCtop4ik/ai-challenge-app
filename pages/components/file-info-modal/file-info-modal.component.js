import HistoryApi from "../../api/history.api";
import { useState, useEffect } from 'react'
import IDBApi from "../../api/idb.api";
import styles from './file-info-modal.module.css'; 
import RealCropper from "../cropper/cropper.component";

export default function FileInfoModal({ id }) {
    const [imageSrc, setImageSrc] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const fetchImage = async () => {
            try {
                const historyCards = HistoryApi.getHistoryCards();
                console.log(historyCards);
                const historyCard = historyCards.find((card) => card.id == id);
                
                if (!historyCard) {
                    console.error(`No history card found for id ${id}`);
                    return;
                }

                console.log(historyCard);

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
    }, [id]);

    return (
        <div>
            <h1 className={styles.title}>Analyze Image</h1>
            <h3 className={styles.information}>When you click on “Analyze”, the cropped image will be automatically sent to a model for analysis. In the next modal, you will be able to view the analyzed image. Modal is experimental, so think about outputs.</h3>
            <h3 className={styles.information}>Image ID is {id}</h3>
            {imageSrc && <RealCropper imageSrc={imageSrc} />}
        </div>
    )
}