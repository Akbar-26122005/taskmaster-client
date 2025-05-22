import React, { useState } from "react";
import '../styles/createProject.css';

function ProjectCreator({closed}) {
    const [projectName, setProjectName] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [hasDeadline, setHasDeadline] = useState(false);
    const [deadline, setDeadline] = useState('');
    const [message, setMessage] = useState('');

    const Close = e => {
        if (e.target.id === 'create-project')
            closed()
    };

    const checked = e => {
        setHasDeadline(!hasDeadline);
    };

    const createProject = async () => {
        if (!projectName.trim()) {
            setMessage('Project name is not defined null');
            setTimeout(() => setMessage(null), 5000);
            return;
        }

        const response = await fetch('http://localhost:5050/project/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: projectName,
                description: projectDescription,
                hasDeadline: hasDeadline,
                deadline: deadline,
                user_id: 1
            })
        });

        if (response.ok) {
            alert('ok');
        } else {
            alert('error');
        }
    };

    return (
        <div id="create-project" onClick={e => Close(e)}>
            <div id="create-form">
                <h1 className="no-copy">Create a new project</h1>
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
                <div className={`row no-copy ${hasDeadline ? '' : 'hide'}`}>
                    <input type="datetime-local"
                        value={deadline} onChange={e => setDeadline(e.target.value)} />
                </div>
                <div className="row no-copy">
                    <label htmlFor="">Has a deadline</label>
                    <input type="checkbox"
                        checked={hasDeadline}
                        onChange={checked}
                    />
                </div>
                <div className="row not-copy">
                    <button onClick={e => closed()} className="no-copy">cancel</button>
                    <button onClick={e => createProject()} className="no-copy">create</button>
                </div>
            </div>
            <div className={`message-bar ${!message ? 'hide' : ''}`}
                onClick={() => setMessage(null)}> { message } </div>
        </div>
    );
}

export default ProjectCreator;