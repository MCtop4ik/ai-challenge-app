import HistoryCard from "../history-card/history-card.component"

export default function History() {
    const items = ['1', '2', '3'];
    return (
    <div class="historyContainer">
        <h1 class="historyContainer__title">History</h1>
        {items.map((item, index) => (
        <div key={index} className="item">
          <HistoryCard id={item}></HistoryCard>
        </div>
      ))}
    </div>
    )
}