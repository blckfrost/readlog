import express from 'express';
import dotenv from 'dotenv';
import bookRoutes from '../src/routes/bookRoutes';
import authRoutes from '../src/routes/authRoutes';
import { authMiddleware } from './middlewares/authMiddleware';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './lib/auth';

const PORT = process.env.PORT || 8080;

dotenv.config();
const app = express();

app.all('/api/auth/{*any}', toNodeHandler(auth));

app.use(express.json());

app.get('/api', (req, res) => {
    res.status(200).json({ message: 'Hello world 🌍' });
    console.log('Home / hit');
});

app.use('/api/books', authMiddleware, bookRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Server has started on: ${PORT}...`);
});
