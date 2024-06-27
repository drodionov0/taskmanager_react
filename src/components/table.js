import styles from '../styles/table.module.css';
import { useNavigate } from 'react-router-dom';



const Table = () => {
    
    const navigate = useNavigate();

    const HandleAdd = () =>  {
      navigate('/add');
    };

    return(
        <body>
            <div className={styles.cont} >
                <div className={styles.get}>
                    <p>Список записей</p>
                    <button className={styles.button} onClick={HandleAdd}>Добавить</button>
                </div>
                <div className={styles.board}>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Наименование</th>
                                <th>Тип</th>
                                <th>Имя инициатора</th>
                                <th>Дата создания</th>
                                <th>Дата изменения</th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </body>
    )
}

export default Table;