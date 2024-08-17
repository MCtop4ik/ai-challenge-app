import styles from './buttons.module.css';

export default function Buttons() {
    const handleClick = () => {
        alert('Button clicked!');
    };

    return (
        <div className={styles.buttonsContainer}>
            <div className={styles.buttonsContainer__button} onClick={handleClick}>
                <img className={styles.buttonsContainer__button_icon} src='./upload-icon.png'></img>
                <p className={styles.buttonsContainer__button_description}>Choose</p>
            </div>
            <div className={styles.buttonsContainer__button} onClick={handleClick}>
                <img className={styles.buttonsContainer__button_icon} src='./photo-icon.png'></img>
                <p className={styles.buttonsContainer__button_description}>Choose</p>
            </div>
        </div>
    )
}