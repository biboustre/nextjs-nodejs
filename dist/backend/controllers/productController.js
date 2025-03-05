"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleProductRequest = void 0;
const Product_1 = __importDefault(require("../models/Product"));
const handleProductRequest = async (req, res) => {
    if (req.method === 'GET' && req.url === '/api/products') {
        const products = await Product_1.default.find();
        res.statusCode = 200;
        res.end(JSON.stringify(products));
    }
    else if (req.method === 'POST' && req.url === '/api/products') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', async () => {
            const { name, description, price, stock } = JSON.parse(body);
            const product = new Product_1.default({ name, description, price, stock });
            await product.save();
            res.statusCode = 201;
            res.end(JSON.stringify(product));
        });
    }
    else {
        res.statusCode = 404;
        res.end('Not Found');
    }
};
exports.handleProductRequest = handleProductRequest;
