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
            </div>
        </body>
    )
}

export default Table;