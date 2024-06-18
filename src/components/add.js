import styles from '../styles/add.module.css'
import { useState, useEffect } from 'react';
import axios from 'axios';



const Add = () => {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/tasks')
        .then(response => {
            setTasks(response.data);
        })
        .catch(error => console.log(error))
    }, [])

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
                        <select>
                            {tasks.map(task => (
                                <option key={task.id}>{task.type}</option>
                            ))}
                        </select>
                    </form>
                </div>
            </div>
        </body>
    )
}

export default Add;
