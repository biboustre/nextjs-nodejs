"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleUserRequest = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const handleUserRequest = async (req, res) => {
    if (req.method === 'POST' && req.url === '/api/users/register') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', async () => {
            const { name, email, password } = JSON.parse(body);
            const hashedPassword = await bcryptjs_1.default.hash(password, 10);
            const user = new User_1.default({ name, email, password: hashedPassword });
            await user.save();
            res.statusCode = 201;
            res.end(JSON.stringify(user));
        });
    }
    else if (req.method === 'POST' && req.url === '/api/users/login') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', async () => {
            const { email, password } = JSON.parse(body);
            const user = await User_1.default.findOne({ email });
            if (user && await bcryptjs_1.default.compare(password, user.password)) {
                const token = jsonwebtoken_1.default.sign({ userId: user._id }, 'secret', { expiresIn: '1h' });
                res.statusCode = 200;
                res.end(JSON.stringify({ token }));
            }
            else {
                res.statusCode = 401;
                res.end('Invalid credentials');
            }
        });
    }
    else {
        res.statusCode = 404;
        res.end('Not Found');
    }
};
exports.handleUserRequest = handleUserRequest;
