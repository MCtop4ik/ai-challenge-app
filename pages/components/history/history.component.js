import HistoryCards from "../history-cards/history-cards.component"
import styles from './history.module.css';

export default function History() {
    return (
    <div className={styles.historyContainer}>
        <h1 className={styles.historyContainer__title}>Recent Images</h1>
        <HistoryCards></HistoryCards>
    </div>
    )
}