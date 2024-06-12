import styles from '../styles/table.module.css';

const Table = () => {
    return(
        <body>
            <div className={styles.get}>
                <p>Список записей</p>
                <button>Добавить</button>
            </div>
        </body>
    )
}

export default Table;