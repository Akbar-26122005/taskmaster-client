import React from "react";
import '../styles/list.css';
import { useNavigate } from "react-router-dom";

function ListTile({id, name, description, isSelectMode, isSelected, onSelect}) {
    const navigate = useNavigate();

    const handleClick = e => {
        if (isSelectMode) {
            e.stopPropagation();
            onSelect(id);
        } else {
            navigate(`/tasks/${id}`);
        }
    };

    return (
        <div className="list-tile no-copy" onClick={handleClick}>
            {isSelectMode && (
                <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onSelect(id)}
                    onClick={e => e.stopPropagation()}
                />
            )}
            <div className="list-name">{name}</div>
            <div className="list-description">{description}</div>
        </div>
    );
}

export default ListTile;