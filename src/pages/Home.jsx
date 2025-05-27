import React, { useState, useEffect } from "react";
import '../styles/Home.css';
import ProjectCreator from "../components/listCreator";
// import { showMessage } from "../components/message";
import ListTile from "../components/list";
import add_icon from '../resources/add-icon.svg';
import del_icon from '../resources/del-icon.svg';

function Home() {
    const [refreshTrigger, setRefreshTrigger] = useState(false);
    const [projectCreator, setProjectCreator] = useState(null);
    const [lists, setLists] = useState([]);
    const [selectMode, setSelectMode] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        const fetchingData = async () => {
            try {
                const response = await fetch(`http://localhost:5050/lists/get?user_id=1`);
                
                const dataJson = await response.json();
                const data = dataJson.data;
                
                if (!response.ok) throw new Error('Error 500');
                
                setLists([]);
                for (const list of data) {
                    setLists(prev => [...prev, {
                        id: list.id,
                        name: list.name,
                        description: list.description,
                    }]);
                }
            } catch (err) {
                console.log(err);
            }
        }

        fetchingData();
    }, [refreshTrigger]);

    const handleSelect = (id) => {
        setSelectedItems(prev => 
            prev.includes(id)
            ? prev.filter(itemId => itemId !== id)
            : [...prev, id]
        );
    };

    const handleDelete = async () => {
        try {
            // Отправка запроса на удаление
            const response = await fetch('http://localhost:5050/lists/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    list_ids: selectedItems
                })
            });

            if (!response.ok) throw new Error('Ошибка удаления');

            // Обновление состояния
            setSelectedItems([]);
            setRefreshTrigger(prev => !prev);
            setSelectMode(false);
        } catch (err) {
            console.error('Ошибка при удалении', err);
        }
    };

    const toolClick = (e) => {
        if (e.target.classList.contains('add-tool')) {
            setProjectCreator(<ProjectCreator closed={() => setProjectCreator(null)} update={() => setRefreshTrigger(prev => !prev)} />);
        } else if (e.target.classList.contains('delete-tool')) {
            setSelectMode(!selectMode);
            if (!selectMode) setSelectedItems([]);
        }
    }

    return (
        <div className="home">
            <div className="header">
                <h3 className="no-copy">tasks lists</h3>
                <div className="tools no-copy">
                    <img
                        src={add_icon}
                        alt="add"
                        className="tool add-tool"
                        onClick={toolClick}
                    />
                    <img
                        src={del_icon}
                        alt="add"
                        className="tool del-tool"
                        onClick={toolClick}
                    />
                </div>
            </div>
            <div className="data-grid">
                {lists.map(list => (
                    <ListTile
                        key={list.id}
                        id={list.id}
                        name={list.name}
                        description={list.description}
                        isSelectMode={selectMode}
                        isSelected={selectedItems.includes(list.id)}
                        onSelect={handleSelect}

                    />
                ))}
                {(selectMode && selectedItems.length > 0) && (
                    <div className="delete-button" onClick={() => handleDelete()}>Delete</div>
                )}
                {projectCreator !== null && projectCreator}
            </div>
        </div>
    );
}

export default Home;
