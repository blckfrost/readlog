import { PrismaClient } from './client';
const prisma = new PrismaClient();

async function main() {
    const user = await prisma.user.create({
        data: {
            username: 'demo_user',
            password: 'hashed_password',
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
        await prisma.$disconnect;
    });
