import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import '../styles/Tasks.css';

function Tasks({ user }) {
    const { id } = useParams();
    const [tasks, setTasks] = useState([]);
    const [refreshTrigger, setRefreshTrigger] = useState(false);
    const [toolActive, setToolActive] = useState(false);
    const [selectTask, setSelectTask] = useState(null);

    useEffect(() => {
        if (user === null) {
            window.location.replace('http://localhost:3000');
            return;
        }

        const fetchingData = async () => {
            try {
                const response = await fetch(`http://localhost:5050/tasks/get?list_id=${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                });

                const dataJson = await response.json();
                const data = dataJson.data;

                if (!response.ok) {
                    throw new Error('Error 505');
                }

                setTasks([]);
                for (const task of data) {
                    setTasks(prev => [...prev, {
                        id: task.id,
                        title: task.title,
                        is_done: task.is_done
                    }]);
                }
            } catch (err) {
                console.log(err);
            }
        };

        fetchingData();
    }, [refreshTrigger]);

    return (
        <div className="Tasks">
            <header className="header no-copy">
                <h3>tasks</h3>
                <div className="tools">
                    <div
                        className={ `tool ${ toolActive && 'active' }` }
                        onClick={ () => setToolActive(prev => !prev) }
                    >
                        <div className="tile"></div>
                        <div className="tile"></div>
                        <div className="tile"></div>
                    </div>
                </div>
            </header>
            <div className="Tasks-content">
                <div className="tasks-list">
                    {tasks.map(task => (
                        <Task
                            key={ task.id }
                            id={ task.id }
                            title={ task.title }
                            is_done={ task.is_done }
                            isSelect={ selectTask === task.id }
                            onClick={
                                () => {
                                    if (selectTask === task.id) return;
                                    setSelectTask(task.id);
                                    if (!toolActive) setToolActive(prev => !prev);
                                }
                            }
                        />
                    ))}
                </div>
                <div className={ `tasks-options ${ toolActive && 'active' }` }>
                    <div className="row">
                        <label>Title</label>
                        <input type="text" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export function Task({ id, title, is_done, onClick, isSelect }) {
    const [isDone, setIsDone] = useState(is_done);

    return (
        <div className={`task ${ isSelect && 'select' }`} onClick={onClick}>
            <div className={`task-title ${isDone && 'done'}`}>{title}</div>
            <div className="task-options">

            </div>
        </div>
    );
}

export default Tasks;