// filepath: /c:/Users/bibou/nextjs-nodejs/backend/controllers/productController.ts
import { IncomingMessage, ServerResponse } from 'http';
import Product from '../models/Product';

export const handleProductRequest = async (req: IncomingMessage, res: ServerResponse) => {
  if (req.method === 'GET' && req.url === '/api/products') {
    const products = await Product.find();
    res.statusCode = 200;
    res.end(JSON.stringify(products));
  } else if (req.method === 'POST' && req.url === '/api/products') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', async () => {
      const { name, description, price, stock } = JSON.parse(body);
      const product = new Product({ name, description, price, stock });
      await product.save();
      res.statusCode = 201;
      res.end(JSON.stringify(product));
    });
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
};