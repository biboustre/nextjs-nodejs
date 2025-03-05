"use strict";
// import http from 'http';
// import mongoose from 'mongoose';
// import { handleRequest } from './routes/index';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const PORT = process.env.PORT || 5000;
// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/ecommerce')
//   .then(() => {
//     console.log('Connected to MongoDB');
//     // Create HTTP server
//     const server = http.createServer(handleRequest);
//     server.listen(PORT, () => {
//       console.log(`Server is running on http://localhost:${PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.error('Connection error', error);
//   });
const http_1 = __importDefault(require("http"));
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = require("./routes/index");
const PORT = process.env.PORT || 5000;
// Connect to MongoDB
mongoose_1.default.connect('mongodb://localhost:27017/ecommerce')
    .then(() => {
    console.log('Connected to MongoDB');
    // Create HTTP server
    const server = http_1.default.createServer((req, res) => {
        // Set CORS headers
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        // Handle preflight requests
        if (req.method === 'OPTIONS') {
            res.writeHead(204);
            res.end();
            return;
        }
        // Handle actual requests
        (0, index_1.handleRequest)(req, res);
    });
    server.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
})
    .catch((error) => {
    console.error('Connection error', error);
});
