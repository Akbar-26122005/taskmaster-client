import React from "react";
import '../styles/Home.css';
import ProjectCreator from "../components/projectCreator";

function Home() {
    return (
        <div className="data-grid">
            <div className="header">
                <div className="tools">
                    <span className="material-icons tool add-tool" popoverTarget="create-project-popover" popoverTargetAction="show">add</span>
                    <span className="material-icons tool delete-tool">delete</span>
                </div>
            </div>
            <ProjectCreator />
        </div>
    );
}

export default Home;
