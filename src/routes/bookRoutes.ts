import express from 'express';
import prisma from '../lib/prisma';

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
    } catch (err) {
        res.status(500).json({ message: 'Error fetching book' });
    }
});

// GET one Books
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
        res.status(500).json({ error: 'Error fetching book' });
    }
});

// Create Book
router.post('/', async (req, res) => {
    const { title, author, type } = req.body;

    if (!title || !author || !type) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const createBook = await prisma.book.create({
            data: {
                userId: req.userId,
                title: title,
                author: author,
                type: type,
            },
        });
        res.status(201).json(createBook);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error creating book' });
    }
});

// Update Book
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, author, type, isRead, totalPage, currentPage } = req.body;
    try {
        const book = await prisma.book.findUnique({
            where: { id },
        });
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }

        if (!book || book.userId !== req.userId) {
            return res.status(403).json({ error: 'Not authorized' });
        }
        const updateBook = await prisma.book.update({
            where: { id },
            data: {
                ...(title !== undefined && { title }),
                ...(author !== undefined && { author }),
                ...(type !== undefined && { type }),
                ...(isRead !== undefined && { isRead }),
                ...(totalPage !== undefined && { totalPage }),
                ...(currentPage !== undefined && { currentPage }),
            },
        });
        res.json(updateBook);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to update book' });
    }
});

// Delete Book
router.delete(':id', async (req, res) => {
    const { id } = req.params;
    try {
        const book = await prisma.book.findUnique({
            where: { id },
        });
        if (!book || book.userId !== req.userId) {
            return res.status(403).json({ error: 'Not authorized' });
        }

        await prisma.book.delete({
            where: { id },
        });

        res.send({ message: 'Book deleted' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to delete book' });
    }
});

export default router;
