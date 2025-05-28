import React, { useEffect } from "react";
import '../styles/Auth.css';

const checkAuth = () => {

}

export const LogIn = () => {

    useEffect(checkAuth, []);

    return (
        <div className="Auth-background">
            <div className="log-in-form">
                <div className="row">
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" />
                </div>
            </div>
        </div>
    );
}

export const SignUp = () => {

    useEffect(checkAuth, []);

    return (
        <div className="Auth-background">
            <div className="=sign-up-form"></div>
        </div>
    );
}