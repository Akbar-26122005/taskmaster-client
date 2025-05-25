import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Tasks() {
    const { id } = useParams();
    const [tasks, setTasks] = useState([]);
    const [refreshTrigger, setRefreshTrigger] = useState(false);

    useEffect(() => {
        const fetchingData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/get-tasks?list_id=${id}`);

                const data = await response.json();

                if (!response.ok) {
                    throw new Error('Error 505');
                }

                setTasks([]);
                for (const task of data.tasks) {
                    setTasks(prev => [...prev, {
                        id: task.id,
                        
                    }]);
                }
            } catch (err) {
                console.log(err);
            }
        };

        fetchingData();
    }, [refreshTrigger]);

    return (
        <div className="tasks-list">

        </div>
    );
}

function task({ id,  }) {
    return (
        <div className="tasks-list">

        </div>
    );
}

export default Tasks;