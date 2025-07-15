import express from 'express';
import dotenv from 'dotenv';
import bookRoutes from '../src/routes/bookRoutes';
import authRoutes from '../src/routes/authRoutes';
import { authMiddleware } from './middlewares/authMiddleware';

const PORT = process.env.PORT || 8080;

dotenv.config();
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello world 🌍' });
    console.log('Home / hit');
});

app.use('/books', authMiddleware, bookRoutes);
app.use('/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Server has started on: ${PORT}...`);
});
