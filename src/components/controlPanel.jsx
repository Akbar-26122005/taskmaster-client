import React from "react";

function ControlPanel({user}) {
    return (
        <div className="control-panel no-copy">
            {
                user === null ?
                <div className>
                    <div className="contro-panel no-copy"></div>
                </div> : 
                <div className="control=panel no-copy">
                    <div className="user-name">Akbar</div>
                    <div className="log-out-btn">Log out</div>
                </div>
            }
        </div>
    );
}

export default ControlPanel;