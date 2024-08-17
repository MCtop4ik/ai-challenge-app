import styles from './history-card.module.css';

export default function HistoryCard({id}) {
    return (
    <div className={styles.historyCard}>
        <h2 className={styles.historyCard__title}>Card {id}</h2>
        <h3 class="historyCard__id">{id}</h3>
    </div>
    )
}