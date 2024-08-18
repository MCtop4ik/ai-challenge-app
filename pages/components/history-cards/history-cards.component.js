import styles from './history-cards.module.css';
import HistoryCard from "../history-card/history-card.component"
import HistoryApi from '../../api/history.api';

export default function HistoryCards() {
    // HistoryApi.addHistoryCard({'id': 1, 'imagePath': 'test.png', 'pipeCount': 1, 'createdDate': new Date()});
    let items = HistoryApi.getHistoryCards();

    return (
        <div className={styles.historyCardsContainer}>
            {items.map((historyCard, index) => (
                <HistoryCard key={index} historyCard={historyCard}></HistoryCard>
            ))}
        </div>
    )
}
