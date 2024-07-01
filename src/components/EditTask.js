import styles from '../styles/edit.module.css';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const EditTask = () => {
    const { state } = useLocation();
    const { taskId } = useParams();
    const [task, setTask] = useState(state?.task || {});
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();

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
        if (!state?.task) {
            axios.get(`http://localhost:3001/task/${taskId}`)
                .then(response => {
                    setTask(response.data);
                })
                .catch(error => console.log(error));
        }

        axios.get('http://localhost:3001/tasks')
            .then(response => setTasks(response.data))
            .catch(error => console.log(error));

    }, [state, taskId]);

    const handleSave = (e) => {
        e.preventDefault();
        const updatedTask = {
            ...task,
            dateRed: getFormattedDate()
        };

        axios.put(`http://localhost:3001/task/${task.id}`, updatedTask)
            .then(response => {
                navigate('/');
            })
            .catch(error => console.log(error));
    };

    const handleDelete = (e) => {
        e.preventDefault();
        axios.delete(`http://localhost:3001/task/${task.id}`)
            .then(response => {
                navigate('/');
            })
            .catch(error => console.log(error));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask(prevTask => ({
            ...prevTask,
            [name]: value
        }));
    };

    return (
        <div className={styles.container}>
            <div className={styles.formadd}>
                <form className={styles.formad} onSubmit={handleSave}>
                    <label className={styles.lab}>Наименование</label>
                    <input
                        className={styles.inp}
                        name="nameTask"
                        value={task.nameTask || ''}
                        onChange={handleChange}
                    />
                    <label className={styles.lab}>Описание</label>
                    <textarea
                        className={styles.inp2}
                        name="descriptionTask"
                        value={task.descriptionTask || ''}
                        onChange={handleChange}
                    />
                    <label className={styles.lab}>Тип</label>
                    <select
                        className={styles.sel}
                        name="typeTask"
                        value={task.typeTask || ''}
                        onChange={handleChange}
                    >
                        {tasks.map(task => (
                            <option key={task.id} value={task.type}>{task.type}</option>
                        ))}
                    </select>
                    <p>Имя инициатора: {task.nameInit}</p>
                    <p>Дата создания: {task.dateInit}</p>
                    <div className={styles.edit}>
                        <button type="submit">Сохранить</button>
                        <button type="button" onClick={handleDelete}>Удалить</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditTask;
