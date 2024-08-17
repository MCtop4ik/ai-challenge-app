import styles from './history-cards.module.css';
import HistoryCard from "../history-card/history-card.component"

export default function HistoryCards() {
    const items = ['1', '2', '3', 'test', '5', 'y'];
    return (
        <div className={styles.historyCardsContainer}>
            {items.map((item) => (
                <HistoryCard id={item}></HistoryCard>
            ))}
        </div>
    )
}
