import styles from './history-card.module.css';

export default function HistoryCard({id}) {
    return (
    <div className={styles.historyCard}>
        <div className={styles.historyCard__information}>
            <h2 className={styles.historyCard__information_date}>Card {id}</h2>
            <h2 className={styles.historyCard__information_amount}>Card {id}</h2>
        </div>
        <div className={styles.historyCard__photo_container}>
            <img className={styles.historyCard__photo_container_photo} src="./input.png"></img>
        </div>
        {/* <h3 class="historyCard__id">{id}</h3> */}
    </div>
    )
}