import styles from './buttons.module.css';

export default function Buttons() {
    return (
        <div className={styles.buttonsContainer}>
            <div className={styles.buttonsContainer__button}></div>
            <div className={styles.buttonsContainer__button}></div>
        </div>
    )
}