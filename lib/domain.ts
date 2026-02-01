import prisma from './db';

export async function getUserById(userId: string) {

    const user = await prisma.user.findUnique({

        where: {
            id: userId,
        }

    })

    if (!userId) return null;

    return user

}

export async function getUserWithProfessionalProfile(userId: string) {
    if (userId) return null;

    return prisma.user.findUnique({
        where: {
            id: userId,
        },
        include: {
            professionalProfile: true
        }
    })
}