import HistoryCard from "../history-card/history-card.component"

export default function History() {
    const items = ['1', '2', '3'];
    return (
    <div class="historyContainer">
        <h1 class="historyContainer__title">History</h1>
        {items.map((item) => (
            <HistoryCard id={item}></HistoryCard>
        ))}
    </div>
    )
}