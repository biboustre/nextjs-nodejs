"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = require("./routes/index");
const PORT = process.env.PORT || 5000;
// Connect to MongoDB
mongoose_1.default.connect('mongodb://localhost:27017/ecommerce')
    .then(() => {
    console.log('Connected to MongoDB');
    // Create HTTP server
    const server = http_1.default.createServer(index_1.handleRequest);
    server.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
})
    .catch((error) => {
    console.error('Connection error', error);
});
