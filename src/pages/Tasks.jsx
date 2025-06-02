import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import '../styles/Tasks.css';
import add_icon from '../resources/add-icon.svg';
import { showMessage } from "../components/message";

function Tasks({ user }) {
    const { id } = useParams();
    const [tasks, setTasks] = useState([]);
    const [refreshTrigger, setRefreshTrigger] = useState(false);
    const [toolActive, setToolActive] = useState(false);
    const [selectTask, setSelectTask] = useState(null);
    const [isChanged, setIsChanged] = useState(false);

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
                
                const taskId = selectTask.id;
                setSelectTask(tasks.find(task => task.id === taskId));
            } catch (err) {
                console.log(err);
            }
        };

        fetchingData();
    }, [refreshTrigger]);

    const updateTaskInList = (updatedTask) => {
        setTasks(prevTasks => 
            prevTasks.map(task => 
                task.id === updatedTask.id ? updatedTask : task
            )
        );
    };

    const handleSelectTask = task => {
        if (selectTask && selectTask.id === task.id) return;
        setSelectTask(task);
        if (!toolActive) setToolActive(prev => !prev);

        setIsChanged(false);
    }

    const handleCreateTask = () => {
        alert('create');
    };

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
                            isSelect={ selectTask && selectTask.id === task.id }
                            onClick={ () => handleSelectTask(task) }
                        />
                    ))}
                    <div className="create tool">
                        <img
                            src={add_icon}
                            alt=""
                            onClick={handleCreateTask}
                        />
                    </div>
                </div>
                { selectTask &&
                <Options
                    task={ selectTask }
                    toolActive={ toolActive }
                    _isChanged={ isChanged }
                    _setIsChanged={ setIsChanged }
                    _setRefreshTrigger={ setRefreshTrigger }
                    _updateTask={ updateTaskInList }
                />}
            </div>
        </div>
    );
}

export function Options({ task, toolActive, _isChanged, _setIsChanged, _setRefreshTrigger, _updateTask }) {
    const [title, setTitle] = useState(task.title || '');
    const [isDone, setIsDone] = useState(task.is_done || false);

    useEffect(() => {
        setTitle(task.title || '');
        setIsDone(task.is_done || false);
        _setIsChanged(false);
    }, [task]);

    const handleClickTool = async e => {
        try {
            let path;
            if (e.target.className.includes('delete'))
                path = '/delete';
            else if (e.target.className.includes('save'))
                path = '/update';

            const response = await fetch(`http://localhost:5050/tasks${path}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: path === 'delete'
                ? JSON.stringify({ id: task.id })
                : JSON.stringify({
                    id: task.id,
                    title: title,
                    is_done: isDone
                })
            });

            const data = response.json();
            
            if (!response.ok) throw new Error('');

            if (path === '/update' && _updateTask) {
                _updateTask({
                    ...task,
                    title: title,
                    is_done: isDone
                });
            }
            _setRefreshTrigger(prev => !prev);
        } catch (err) {
            console.log(err);
        }
    };

    const handleTitleChange = e => {
        const newValue = e.target.value;
        setTitle(newValue);
        _setIsChanged(task.title !== newValue || task.is_done !== isDone);
    };

    const handleIsDoneChange = e => {
        const newValue = e.target.checked;
        setIsDone(newValue);
        _setIsChanged(task.title !== title || task.is_done !== newValue);
    };

    return (
        <div className={ `tasks-options no-copy ${ toolActive && 'active' }` }>
            <div className="rows">
                <div className="row">
                    <label>Title</label>
                    <input
                        type="text"
                        value={ title }
                        onChange={ handleTitleChange }
                    />
                </div>
                <div className="row">
                    <label>Is done</label>
                    <input
                        type="checkbox"
                        checked={isDone}
                        onChange={ handleIsDoneChange }
                    />
                </div>
                <div className="row">
                    <label>In development</label>
                    <div>???</div>
                </div>
            </div>
            <div className={ `tools ${ _isChanged && 'changed' }` }>
                <div className="tool delete" onClick={ handleClickTool }>Delete</div>
                <div className="tool save"    onClick={ _isChanged ? handleClickTool : () => { } }>Save</div>
            </div>
        </div>
    );
}

export function Task({ id, title, is_done, onClick, isSelect }) {
    const [isDone, setIsDone] = useState(is_done);

    return (
        <div className={`task no-copy ${ isSelect && 'select' }`} onClick={onClick}>
            <div className={`task-title ${isDone && 'done'}`}>{title}</div>
        </div>
    );
}

export default Tasks;