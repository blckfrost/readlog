import express from 'express';
import prisma from '../utils/prisma';

const router = express.Router();

// GET all Books
router.get('/', async (req, res) => {
    const books = await prisma.book.findMany();
    res.json(books);
});

// GET all Books

// Create Book

// Update Book

// Delete Book

export default router;
