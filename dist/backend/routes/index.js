"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleRequest = void 0;
const userController_1 = require("../controllers/userController");
const productController_1 = require("../controllers/productController");
const orderController_1 = require("../controllers/orderController");
const handleRequest = (req, res) => {
    var _a, _b, _c;
    if ((_a = req.url) === null || _a === void 0 ? void 0 : _a.startsWith('/api/users')) {
        (0, userController_1.handleUserRequest)(req, res);
    }
    else if ((_b = req.url) === null || _b === void 0 ? void 0 : _b.startsWith('/api/products')) {
        (0, productController_1.handleProductRequest)(req, res);
    }
    else if ((_c = req.url) === null || _c === void 0 ? void 0 : _c.startsWith('/api/orders')) {
        (0, orderController_1.handleOrderRequest)(req, res);
    }
    else {
        res.statusCode = 404;
        res.end('Not Found');
    }
};
exports.handleRequest = handleRequest;
