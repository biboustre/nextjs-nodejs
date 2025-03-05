// filepath: /c:/Users/bibou/nextjs-nodejs/backend/controllers/userController.ts
import { IncomingMessage, ServerResponse } from 'http';
import User from "../models/User";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const handleUserRequest = async (req: IncomingMessage, res: ServerResponse) => {
  if (req.method === 'POST' && req.url === '/api/users/register') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', async () => {
      const { name, email, password } = JSON.parse(body);
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ name, email, password: hashedPassword });
      await user.save();
      res.statusCode = 201;
      res.end(JSON.stringify(user));
    });
  } else if (req.method === 'POST' && req.url === '/api/users/login') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', async () => {
      const { email, password } = JSON.parse(body);
      const user = await User.findOne({ email });
      if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ userId: user._id }, 'secret', { expiresIn: '1h' });
        res.statusCode = 200;
        res.end(JSON.stringify({ token }));
      } else {
        res.statusCode = 401;
        res.end('Invalid credentials');
      }
    });
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
};