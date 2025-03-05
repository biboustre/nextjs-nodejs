"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleOrderRequest = void 0;
const Order_js_1 = __importDefault(require("../models/Order.js"));
const handleOrderRequest = async (req, res) => {
    if (req.method === 'GET' && req.url === '/api/orders') {
        const orders = await Order_js_1.default.find().populate('user').populate('products.product');
        res.statusCode = 200;
        res.end(JSON.stringify(orders));
    }
    else if (req.method === 'POST' && req.url === '/api/orders') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', async () => {
            const { user, products, total } = JSON.parse(body);
            const order = new Order_js_1.default({ user, products, total });
            await order.save();
            res.statusCode = 201;
            res.end(JSON.stringify(order));
        });
    }
    else {
        res.statusCode = 404;
        res.end('Not Found');
    }
};
exports.handleOrderRequest = handleOrderRequest;
