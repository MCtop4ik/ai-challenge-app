import React from 'react';
import styles from './modal.module.css';

export default function Modal({ show, onClose, children }) {
    if (!show) {
        return null;
    }

    return (
        <div className={styles.modal}>
            <div className={styles.modal__content}>
                <button className={styles.modal__closeButton} onClick={onClose}>
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};

