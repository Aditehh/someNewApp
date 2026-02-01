import prisma from './db';
import { auth } from './auth';
import { headers } from 'next/headers';
import { LocateOff, UserRoundIcon } from 'lucide-react';
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

export async function becomeProvider(location?: string) {
    const authUser = await getCurrentUser();

    if (!authUser) return null;

    const userId = authUser.id;


    const existingUser = await prisma.professionalProfile.findUnique({
        where: {
            userId
        }
    })

    if (existingUser) return existingUser;

    const profile = await prisma.professionalProfile.create({
        data: {
            userId,
            location: location || "",
            experience: 0,
            verified: false
        }
    })

    await prisma.user.update({
        where: { id: userId },
        data: { role: 'PROVIDER' }
    })

    return profile;
}