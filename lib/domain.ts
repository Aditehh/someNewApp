import prisma from './db';
// import type { User } from '@prisma/client';

export async function syncUser(email: string, name: string, image?: string) {

    let user = await prisma.user.findUnique({
        where: { email },
    });

    // Step 2: If user doesn't exist, create one
    if (!user) {
        user = await prisma.user.create({
            data: {
                email,
                name,
                image,
                role: 'USER',
            },

        });
    }

    return user;
}
