import React, { useState, useEffect } from "react";
import '../styles/Home.css';
import ProjectCreator from "../components/createProject";
// import { showMessage } from "../components/message";
import ListTile from "../components/list";

function Home() {
    const [refreshTrigger, setRefreshTrigger] = useState(false);
    const [projectCreator, setProjectCreator] = useState(null);
    const [lists, setLists] = useState([]);

    useEffect(() => {
        const fetchingData = async () => {
            try {
                setLists([]);
                const response = await fetch(`http://localhost:5050/data/get-lists?user_id=1`);

                const dataJson = await response.json();
                const data = dataJson.data;

                if (!response.ok)
                    throw new Error('Error 500');
                
                for (const list of data) {
                    setLists(prev => [...prev, {
                        id: list.id,
                        name: list.name,
                        description: list.description
                    }]);
                }
            } catch (err) {
                console.log();
            }
        }

        fetchingData();
    }, [refreshTrigger]);

    const toolClick = (e) => {
        if (e.target.classList.contains('add-tool')) {
            setProjectCreator(<ProjectCreator closed={() => setProjectCreator(null)} update={() => setRefreshTrigger(prev => !prev)} />);
        } else if (e.target.classList.contains('delete-tool')) {

        }
    }

    return (
        <div className="data-grid">
            <div className="header">
                <h3 className="no-copy">tasks lists</h3>
                <div className="tools no-copy">
                    <span className="material-icons tool add-tool" onClick={e => toolClick(e)}>add</span>
                    <span className="material-icons tool delete-tool" onClick={e => toolClick(e)}>delete</span>
                </div>
            </div>
            {lists.map(l => <ListTile key={l.id} id={l.id} name={l.name} description={l.description} />)}
            {projectCreator !== null && projectCreator}
        </div>
    );
}

export default Home;
