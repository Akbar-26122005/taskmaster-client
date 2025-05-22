import React, { useState } from "react";
import '../styles/Home.css';
import ProjectCreator from "../components/createProject";

function Home() {
    const [projectCreator, setProjectCreator] = useState(null);

    const toolClick = (e) => {
        if (e.target.classList.contains('add-tool')) {
            setProjectCreator(<ProjectCreator closed={() => setProjectCreator(null)} />);
        } else if (e.target.classList.contains('delete-tool')) {

        }
    }

    return (
        <div className="data-grid">
            <div className="header">
                <div className="tools no-copy">
                    <span className="material-icons tool add-tool" onClick={e => toolClick(e)}>add</span>
                    <span className="material-icons tool delete-tool" onClick={e => toolClick(e)}>delete</span>
                </div>
            </div>
            {projectCreator !== null && projectCreator}
        </div>
    );
}

export default Home;
