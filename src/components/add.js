import styles from '../styles/add.module.css'
import { useState, useEffect } from 'react';
import axios from 'axios';



const Add = () => {

    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState([]);
    const [taskname, setTaskName] = useState();
    const [desc, setDesc] = useState();
    const [type, setType] = useState();



    const getFormattedDate = () => {
        const date = new Date();
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
    
        return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
    };


    useEffect(() => {
        axios.get('http://localhost:3001/tasks')
        .then(response => {
            setTasks(response.data);
        })
        .catch(error => console.log(error))


        const username = localStorage.getItem('username');

        if (!username) {
        const name = prompt('Введите ваше имя:');
        localStorage.setItem('username', name);
        }

    }, [])


    const handleSubmit = (e) => {
        e.preventDefault();

        const username = localStorage.getItem('username')

        const formatedDate = getFormattedDate();

        const addTask = {
            id: task.length + 1,
            nameTask: taskname,
            descriptionTask: desc,
            typeTask: type,
            nameInit: username,
            dateInit: formatedDate,
            dateRed: formatedDate
        }

        axios.post('http://localhost:3001/task', addTask) 
        .then(response => {
            setTask([...task], response.data)
        }).catch(error => console.log(error))
    }


    return(
        <body>
            <div className={styles.container}>
                <div className={styles.formadd}>
                    <form className={styles.formad} onSubmit={handleSubmit}>
                        <label className={styles.lab}>Наименование</label>
                        <input className={styles.inp} onChange={(e) => setTaskName(e.target.value)}/>
                        <label className={styles.lab}>Описание</label>
                        <textarea className={styles.inp2} onChange={(e) => setDesc(e.target.value)}/>
                        <label className={styles.lab}>Тип задачи</label>
                        <select className={styles.sel} onChange={(e) => setType(e.target.value)}>
                            {tasks.map(task => (
                                <option key={task.id}>{task.type}</option>
                            ) ) }
                        </select>
                        <div className={styles.butcenter}>
                            <button className={styles.butadd} type='submit'>Создать</button>
                        </div>
                    </form>
                </div>
            </div>
        </body>
    )
}

export default Add;
