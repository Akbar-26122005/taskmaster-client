import React, { useEffect, useState } from "react";
import '../styles/Auth.css';
import { showMessage } from "../components/message";
import tasks_background from '../resources/tasks_background.jpg';

export const LogIn = ({ _user, _setUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const fetchingData = async () => {
            try {
                const response = await fetch('http://localhost:5050/auth/check', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                });
            
                if (!response.ok)
                    throw new Error('Fetching failed');

                const data = await response.json();

                if (!data.isAuthenticated)
                    throw new Error('User is not authenticated');

                if (!data.user)
                    throw new Error('User is null');

                _setUser(data.user);
                window.location.replace('../');
            } catch (err) {
                console.error(err);
            }
        };

        !_user && fetchingData();
    });

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5050/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    email,
                    password
                })
            });

            if (!response.ok)
                throw new Error('Fetching failed');

            const data = await response.json();

            if (!data.success) {
                throw new Error('Couldn\'t log in');
            }
            _setUser(data.user);
            window.location.replace('../');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="Auth-background">
            <form className="log-in-form no-copy" onSubmit={handleSubmit}>
                <div className="row">
                    <h2>Sign in</h2>
                </div>
                <div className="row">
                    <label>Email</label>
                    <input
                        type="email"
                        id="email"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className="row">
                    <label>Password</label>
                    <input
                        type="password"
                        required
                        minLength={8}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div className="row">
                    <button className="submit-btn">Sign in</button>
                </div>
            </form>
        </div>
    );
}

export const SignUp = ({ _user, _setUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [middleName, setMiddleName] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5050/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    email: email,
                    password: password,
                    first_name: firstName,
                    last_name: lastName,
                    middle_name: middleName
                })
            });

            if (!response.ok) {
                if (response.status === 409) showMessage('Email already exists', 'error-message');
            }

            const data = await response.json();

            if (!data.success)
                throw new Error(data.message);

            _setUser(data.user);
            window.location.replace('../');
        } catch (err) {
        }
    };

    return (
        <div className="Auth-background">
            <div>
                <img src={tasks_background} alt="" className="tasks_background" />
            </div>
            <form className="sign-up-form no-copy" onSubmit={handleSubmit}>
                <div className="row">
                    <h1>Sign up</h1>
                </div>
                <div className="row">
                    <label>Email *</label>
                    <input type="email" placeholder="Email" required value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="row">
                    <label>Password *</label>
                    <input type="password" placeholder="Password" required minLength={8} value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <div className="row">
                    <label>First name *</label>
                    <input type="text" placeholder="First name" required value={firstName} onChange={e => setFirstName(e.target.value)} />
                </div>
                <div className="row">
                    <label>Last name *</label>
                    <input type="text" placeholder="Last name" required value={lastName} onChange={e => setLastName(e.target.value)} />
                </div>
                <div className="row">
                    <label>Middle name</label>
                    <input type="text" placeholder="Middle name" required value={middleName} onChange={e => setMiddleName(e.target.value)} />
                </div>
                <div className="row">
                    <button>Continue</button>
                </div>
            </form>
        </div>
    );
}