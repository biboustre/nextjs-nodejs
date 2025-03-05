import http from 'http';
import mongoose from 'mongoose';
import { handleRequest } from './routes/index';

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ecommerce')
  .then(() => {
    console.log('Connected to MongoDB');
    // Create HTTP server
    const server = http.createServer(handleRequest);
    server.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Connection error', error);
  });