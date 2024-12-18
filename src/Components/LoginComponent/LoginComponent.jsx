import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './LoginComponent.css';

const LoginComponent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Handlers for input fields
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    // Submit handler
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent form default submission behavior

        axios
            .post('http://localhost:3000/mind_quiz/v1/login', {
                email: email,
                password: password,
            })
            .then((response) => {
                if (response.status === 201) {
                    alert(`Welcome ${response.data.firstName} ${response.data.lastName}!`);
                    localStorage.setItem('token', response.data.token);
                    window.location.href = '/userdata';
                }
            })
            .catch((error) => {
                alert(`Status: ${error.response.status} - ${error.response.data.message}`);
            });
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                {/* Email Field */}
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        className="form-control"
                        placeholder="Enter your email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                </div>

                {/* Password Field */}
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        placeholder="Enter your password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                </div>

                {/* Remember Me */}
                <div className="form-check mb-3">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="rememberMe"
                    />
                    <label className="form-check-label" htmlFor="rememberMe">
                        Remember me?
                    </label>
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn btn-outline btn-block">
                    Submit
                </button>

                {/* Additional Links */}
                <p className="text-right mt-3">
                    <Link to="#">Forgot Password?</Link>
                </p>
                <p className="text-right">
                    New User? <Link to="/signup">Register here!</Link>
                </p>
            </form>
        </div>
    );
};

export default LoginComponent;