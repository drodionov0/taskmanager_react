import styles from '../styles/edit.module.css';

const EditTask = () => {
    return( 
        <div className={styles.container}>
            <div className={styles.formadd}>
                <form className={styles.formad}>
                    <label className={styles.lab}>Наименование</label>
                    <input className={styles.inp} />
                    <label className={styles.lab}>Описание</label>
                    <textarea className={styles.inp2} />
                    <label className={styles.lab}>Тип</label>
                    <select className={styles.sel}/>
                    <p>Имя инициатора: </p>
                    <p>Дата создания: </p>
                    <div className={styles.edit}>
                        <button>Сохранить</button>
                        <button>Удалить</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditTask;