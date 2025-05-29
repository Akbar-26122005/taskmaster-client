import React from "react";
import '../styles/controlPanel.css';

function ControlPanel({ user }) {
    const className = 'control-panel no-copy';

    const Authorization = e => {
        if (e.target.innerText === 'Log in') {
            window.location.assign('/auth/log-in');
        } else if (e.target.innerText === 'Sign up') {
            window.location.assign('auth/sign-up');
        }
    };

    return (user === null
        ? <div className={className}>
            <div className="auth-btn log-in-btn"
                onClick={Authorization}>Log in</div>
            <div className="auth-btn sign-up-btn"
                onClick={Authorization}>Sign up</div>
        </div>
        : <div className={className}>
            <div className="user-name">{user.first_name}</div>
            <div className="log-out-btn">Log out</div>
        </div>
    );
}

export default ControlPanel;