import styles from '../styles/table.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

const MAX_PER_PAGE = 5;

const Table = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [task, setTask] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3001/task')
            .then(response => {
                setTask(response.data);
            })
            .catch(error => console.log(error));
    }, []);

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const getPaginatedData = () => {
        const startIndex = (currentPage - 1) * MAX_PER_PAGE;
        const endIndex = startIndex + MAX_PER_PAGE;
        return task.slice(startIndex, endIndex);
    };

    const getPageNumbers = () => {
        const totalPages = Math.ceil(task.length / MAX_PER_PAGE);
        return Array.from({ length: totalPages }, (_, index) => index + 1);
    };

    const handleAdd = () => {
        navigate('/add');
    };

    const handleEdit = (task) => {
        navigate(`/edit/${task.id}`, { state: { task } });
    };

    return (
        <div className={styles.cont}>
            <div className={styles.get}>
                <p>Список записей</p>
                <button className={styles.button} onClick={handleAdd}>Добавить</button>
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
                    <tbody>
                        {getPaginatedData().map(task => (
                            <tr key={task.id} className={styles.comp} onClick={() => handleEdit(task)}>
                                <td>{task.id}</td>
                                <td>{task.nameTask}</td>
                                <td>{task.typeTask}</td>
                                <td>{task.nameInit}</td>
                                <td>{task.dateInit}</td>
                                <td>{task.dateRed}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className={styles.pagination}>
                {getPageNumbers().map(number => (
                    <button
                        key={number}
                        onClick={() => handlePageClick(number)}
                        className={number === currentPage ? styles.active : ''}
                    >
                        {number}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Table;
