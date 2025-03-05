// filepath: /c:/Users/bibou/nextjs-nodejs/backend/controllers/orderController.ts
import { IncomingMessage, ServerResponse } from 'http';
import Order from '../models/Order.js';

export const handleOrderRequest = async (req: IncomingMessage, res: ServerResponse) => {
  if (req.method === 'GET' && req.url === '/api/orders') {
    const orders = await Order.find().populate('user').populate('products.product');
    res.statusCode = 200;
    res.end(JSON.stringify(orders));
  } else if (req.method === 'POST' && req.url === '/api/orders') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', async () => {
      const { user, products, total } = JSON.parse(body);
      const order = new Order({ user, products, total });
      await order.save();
      res.statusCode = 201;
      res.end(JSON.stringify(order));
    });
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
};