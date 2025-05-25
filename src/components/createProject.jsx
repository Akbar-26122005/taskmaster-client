import React, { useState } from "react";
import '../styles/createProject.css';
import { showMessage } from "./message";

function ProjectCreator({closed, update}) {
    const [projectName, setProjectName] = useState('');
    const [projectDescription, setProjectDescription] = useState('');

    const Close = e => {
        if (e.target.id === 'create-project')
            closed()
    };

    const createProject = async () => {
        if (!projectName.trim()) {
            showMessage('The project name cannot be empty.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5050/lists/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    name: projectName,
                    description: projectDescription,
                    user_id: 1
                })
            });

            const result = await response.json();

            if (!response.ok)
                throw new Error(result.error)
            else
                closed();
                showMessage('The task list has been created successfully.', 'accept-message');
                update();
        } catch (err) {
            alert('Ошибка: ' + err.message);
        }
    };

    return (
        <div id="create-project" onClick={e => Close(e)}>
            <div id="create-form">
                <div className="row head-title no-copy">
                    <h1>Create a new list</h1>
                </div>
                <div className="row no-copy">
                    <input type="text" id="project-name-input" placeholder=""
                        value={projectName}
                        onChange={e => setProjectName(e.target.value)}
                    />
                    <label htmlFor="project-name-input" onClick={e => document.getElementById('project-name-input').focus()}>name</label>
                </div>
                <div className="row no-copy">
                    <input type="text" id="project-description-input" placeholder=""
                        value={projectDescription}
                        onChange={e => setProjectDescription(e.target.value)}
                    />
                    <label htmlFor="project-description-input" onClick={e => document.getElementById('project-description-input').focus()}>description</label>
                </div>
                <div className="row buttons not-copy">
                    <button onClick={e => closed()} className="no-copy">cancel</button>
                    <button onClick={e => createProject()} className="no-copy">create</button>
                </div>
            </div>
        </div>
    );
}

export default ProjectCreator;