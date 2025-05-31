import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import '../styles/Tasks.css';

function Tasks({ user }) {
    const { id } = useParams();
    const [tasks, setTasks] = useState([]);
    const [refreshTrigger, setRefreshTrigger] = useState(false);

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
            <header className="Tasks-header">

            </header>
            <div className="Tasks-content">
                <div className="tasks-list">
                    {tasks.map(task => (
                        <Task
                            key={task.id}
                            id={task.id}
                            title={task.title}
                            is_done={task.is_done}
                        />
                    ))}
                </div>
                <div className="tasks-options">

                </div>
            </div>
        </div>
    );
}

function Task({ id, title, is_done }) {
    const [isDone, setIsDone] = useState(is_done);

    const handleMouseDown = e => {
        
    };

    return (
        <div className="task" onMouseDown={handleMouseDown}>
            <div className={`task-title ${isDone && 'done'}`}>{title}</div>
            <div className="task-options">

            </div>
            {/* <input
                type="checkbox"
                value={isDone}
                onChange={e => setIsDone(prev => !prev)}
            /> */}
        </div>
    );
}

export default Tasks;