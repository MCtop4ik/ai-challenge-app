import styles from './history-cards.module.css';
import HistoryCard from "../history-card/history-card.component"
import HistoryApi from '../../api/history.api';
import React, { useEffect, useState } from 'react';

export default function HistoryCards() {
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
      {items.length === 0 && (
          <div className={styles.historyCardsContainer__title}>
            No images
          </div>
        )}
    </div>
  )
}
