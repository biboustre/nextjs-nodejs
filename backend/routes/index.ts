// filepath: /c:/Users/bibou/nextjs-nodejs/backend/routes/index.ts
import { IncomingMessage, ServerResponse } from 'http';
import { handleUserRequest } from '../controllers/userController';
import { handleProductRequest } from '../controllers/productController';
import { handleOrderRequest } from '../controllers/orderController';

export const handleRequest = (req: IncomingMessage, res: ServerResponse) => {
  if (req.url?.startsWith('/api/users')) {
    handleUserRequest(req, res);
  } else if (req.url?.startsWith('/api/products')) {
    handleProductRequest(req, res);
  } else if (req.url?.startsWith('/api/orders')) {
    handleOrderRequest(req, res);
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
};