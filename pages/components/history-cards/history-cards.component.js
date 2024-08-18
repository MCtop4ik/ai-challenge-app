import styles from './history-cards.module.css';
import HistoryCard from "../history-card/history-card.component"
import HistoryApi from '../../api/history.api';
import React, { useEffect, useState } from 'react';

export default function HistoryCards() {
    // HistoryApi.addHistoryCard({'id': 1, 'imagePath': 'test.png', 'pipeCount': 1, 'createdDate': new Date()});
    const [items, setItems] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        const data = await HistoryApi.getHistoryCards();
        setItems(data);
      };
  
      fetchData();
    }, []);

    return (
        <div className={styles.historyCardsContainer}>
            {items.map((historyCard, index) => (
                <HistoryCard key={index} historyCard={historyCard}></HistoryCard>
            ))}
        </div>
    )
}
