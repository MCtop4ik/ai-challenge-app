import styles from './header.module.css';

export default function Header() {
    return (
        <div className={styles.header}>
            <img className={styles.header__logo} src="logo-white.png"></img>
        </div>
    )
}