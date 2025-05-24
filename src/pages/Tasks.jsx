import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

function Tasks() {
    const { list_id } = useParams();

    useEffect(() => {

    });

    return (
        <div className="tasks-list">

        </div>
    );
}

function task({id, }) {
    return (
        <div>

        </div>
    );
}

export default Tasks;