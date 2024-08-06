
import React, { useState } from 'react';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('')

    const handleLogin = (e) => {
        e.preventDefault();
        if (username === 'admin' && password === 'password') {
            alert("login exitoso")
        } else {
            alert('credenciales invalidas')
        }
    }

    return (
        <div className="login-container">
            <h2>Admin Login</h2>
            <form onSubmit={handleLogin}>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
