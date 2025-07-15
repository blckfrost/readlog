import express from 'express';
import prisma from '../utils/prisma';

const router = express.Router();

// GET all Books
router.get('/', async (req, res) => {
    try {
        const books = await prisma.book.findMany({
            where: {
                userId: req.userId,
            },
        });

        if (!books) {
            return res.status(404).json({ message: 'Books not found' });
        }
        res.json(books);
    } catch (err) {}
});

// GET all Books
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const book = await prisma.book.findUnique({
            where: {
                id: id,
            },
        });

        if (book?.userId !== req.userId) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json(book);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching book' });
    }
});

// Create Book

// Update Book

// Delete Book

export default router;
