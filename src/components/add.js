import styles from '../styles/add.module.css'


const Add = () => {
    return(
        <body>
            <div className={styles.container}>
                <div className={styles.formadd}>
                    <form className={styles.formad}>
                        <label className={styles.lab}>Наименование</label>
                        <input className={styles.inp}/>
                        <label className={styles.lab}>Описание</label>
                        <textarea className={styles.inp2}/>
                        <label className={styles.lab}>Тип задачи</label>
                    </form>
                </div>
            </div>
        </body>
    )
}

export default Add;
