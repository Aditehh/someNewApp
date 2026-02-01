import prisma from './db';
import { auth } from './auth';
import { headers } from 'next/headers';
import { UserRoundIcon } from 'lucide-react';
import { treeifyError } from 'better-auth';

export async function getCurrentUser() {

    const reqHeaders = await headers();
    const session = await auth.api.getSession({
        headers: reqHeaders
    })

    if (!session || !session.user) {
        return null
    }

    return prisma.user.findUnique({
        where: {
            id: session.user.id,
            // email: session.user.email,
            // name: session.user.name,
            // image: session.user.image,
        },
        include: {
            professionalProfile: true
        }
    })


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