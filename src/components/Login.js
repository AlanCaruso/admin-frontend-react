
import React from 'react';
import './Login.css';

const Login = () => {


    return (
        <div className="login-container">
            <h2>Admin Login</h2>
            <form>
                <input type="text" placeholder="Username" />
                <input type="password" placeholder="Password" />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
