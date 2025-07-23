import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma';

const JWT_SECRET = process.env.JWT_SECRET;
const router = express.Router();

// Create a user
router.post('/register', async (req, res) => {
    const { password, email } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    try {
        const user = await prisma.user.create({
            data: {
                email: email,
                password: hashedPassword,

                book: {
                    create: {
                        title: 'Test Book',
                        author: 'Test Author',
                        type: 'NOVEL',
                        totalPage: 310,
                        currentPage: 100,
                    },
                },
            },
        });
        if (!JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined');
        }
        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '24h' });
        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(503).json({ message: 'Failed to register user' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const passwordIsValid = bcrypt.compareSync(password, user.password);

        if (!passwordIsValid) {
            return res.status(401).json({ message: 'Invalid Password' });
        }

        if (!JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined');
        }

        const token = jwt.sign({ id: user?.id }, JWT_SECRET, { expiresIn: '24h' });
        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(503).json({ message: 'Failed to login' });
    }
});

export default router;
