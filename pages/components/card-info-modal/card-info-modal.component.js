import styles from './card-info-modal.module.css';

export default function CardInfoModal({ historyCard }) {
    return (
        <div className={styles.cardInfoModalContainer}>
            <img className={styles.cardInfoModalContainer__image} src={historyCard.imagePath}></img>
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
            </div>
        </div>
    )
}