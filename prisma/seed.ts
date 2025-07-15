import { PrismaClient } from './client';
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();

async function main() {
    const password = 'demo_password';
    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = await prisma.user.create({
        data: {
            username: 'demo_user',
            password: hashedPassword,
            book: {
                create: [
                    {
                        title: 'The Hobbit',
                        author: 'J.R.R. Tolkien',
                        type: 'NOVEL',
                        totalPage: 310,
                        currentPage: 100,
                    },
                    {
                        title: 'One Piece',
                        author: 'Eiichiro Oda',
                        type: 'MANGA',
                    },
                ],
            },
        },
    });
    console.log('Seeded user', user);
}

main()
    .catch((err) => {
        console.error(err);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
