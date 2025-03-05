'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const userService_1 = require("../services/userService");
const Login = () => {
    const [email, setEmail] = (0, react_1.useState)('');
    const [password, setPassword] = (0, react_1.useState)('');
    const [error, setError] = (0, react_1.useState)('');
    const [success, setSuccess] = (0, react_1.useState)('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { token } = await (0, userService_1.loginUser)(email, password);
            setSuccess('User logged in successfully');
            setError('');
            // Save the token in localStorage or context for authenticated requests
            localStorage.setItem('token', token);
        }
        catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            }
            else {
                setError('An unknown error occurred');
            }
            setSuccess('');
        }
    };
    return (<div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          <button type="submit" className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Login
          </button>
        </form>
        {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
        {success && <p className="mt-4 text-sm text-green-500">{success}</p>}
      </div>
    </div>);
};
exports.default = Login;
