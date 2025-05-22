import React, { useState } from "react";
import '../styles/createProject.css';

function ProjectCreator({closed}) {
    const [projectName, setProjectName] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [hasDeadline, setHasDeadline] = useState(false);

    function Close(e) {
        if (e.target.id === 'create-project')
            closed()
    }

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
                <div className="row no-copy">
                    <label htmlFor="">Has a deadline</label>
                    <input type="checkbox"
                        checked={hasDeadline}
                        onChange={e => setHasDeadline(!hasDeadline)}
                    />
                </div>
                <div className="row not-copy">
                    <button>cancel</button>
                    <button>create</button>
                </div>
            </div>
        </div>
    );
}

export default ProjectCreator;