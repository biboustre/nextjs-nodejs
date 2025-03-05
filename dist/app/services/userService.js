"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const registerUser = async (name, email, password) => {
    const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
    });
    if (!response.ok) {
        throw new Error('Failed to register user');
    }
    return response.json();
};
exports.registerUser = registerUser;
const loginUser = async (email, password) => {
    const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
        throw new Error('Failed to login');
    }
    return response.json();
};
exports.loginUser = loginUser;
