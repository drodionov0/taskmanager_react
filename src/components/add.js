import styles from '../styles/add.module.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const Add = () => {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState([]);
    const { register, handleSubmit, formState: { errors } } = useForm();
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
        axios.get('http://localhost:3001/tasks')
            .then(response => setTasks(response.data))
            .catch(error => console.log(error));

        const username = localStorage.getItem('username');
        if (!username) {
            const name = prompt('Введите ваше имя:');
            localStorage.setItem('username', name);
        }
    }, []);

    const onSubmit = (data) => {
        const username = localStorage.getItem('username');
        const formattedDate = getFormattedDate();

        const addTask = {
            id: task.length + 1,
            nameTask: data.taskname,
            descriptionTask: data.desc,
            typeTask: data.type,
            nameInit: username,
            dateInit: formattedDate,
            dateRed: formattedDate
        };

        axios.post('http://localhost:3001/task', addTask)
            .then(response => {
                setTask([...task, response.data]);
                navigate('/');
            })
            .catch(error => console.log(error));

    };

    return (
        <div className={styles.container}>
            <div className={styles.formadd}>
                <form className={styles.formad} onSubmit={handleSubmit(onSubmit)}>
                    <label className={styles.lab}>Наименование</label>
                    <input
                        className={styles.inp}
                        {...register('taskname', { 
                            required: 'Наименование обязательно', 
                            minLength: { value: 3, message: 'Минимум 3 символа' }, 
                            maxLength: { value: 100, message: 'Максимум 100 символов' } 
                        })}
                    />
                    {errors.taskname && <p className={styles.error}>{errors.taskname.message}</p>}

                    <label className={styles.lab}>Описание</label>
                    <textarea
                        className={styles.inp2}
                        {...register('desc', { 
                            required: 'Описание обязательно', 
                            minLength: { value: 10, message: 'Минимум 10 символов' }, 
                            maxLength: { value: 255, message: 'Максимум 255 символов' } 
                        })}
                    />
                    {errors.desc && <p className={styles.error}>{errors.desc.message}</p>}

                    <label className={styles.lab}>Тип задачи</label>
                    <select
                        className={styles.sel}
                        {...register('type', { required: 'Выберите тип задачи' })}
                    >
                        <option value="" label="Выберите тип задачи" />
                        {tasks.map(task => (
                            <option key={task.id} value={task.type}>{task.type}</option>
                        ))}
                    </select>
                    {errors.type && <p className={styles.error}>{errors.type.message}</p>}

                    <div className={styles.butcenter}>
                        <button className={styles.butadd} type='submit'>Создать</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Add;
