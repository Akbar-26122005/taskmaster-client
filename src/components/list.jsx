import React from "react";
import '../styles/list.css';

function ListTile({id, name, description}) {

    const clickHandle = e => {
        window.location.assign(`/tasks/${id}`);
    };

    return (
        <div className="list-tile" onClick={clickHandle}>
            <div className="list-name">{name}</div>
            <div className="list-description">{description}</div>
        </div>
    );
}

export default ListTile;