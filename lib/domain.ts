import prisma from './db';
import { auth } from './auth';
import { headers } from 'next/headers';


export async function getCurrentUser() {

    const reqHeaders = await headers();
    const session = await auth.api.getSession({
        headers: reqHeaders
    })

    if (!session || !session.user) {
        return null
    }

    const user = await prisma.user.findUnique({
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

    if (!user) return null;

    return {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.email,
        role: user.role,

        professionalProfile: user.professionalProfile ? {
            verified: user.professionalProfile.verified,
            location: user.professionalProfile.location,
            experience: user.professionalProfile.experience
        } : null

    }


}



export async function becomeProvider(input: {
    location: string;
    experience: number;
    bio?: string;
}) {
    const authUser = await getCurrentUser();
    if (!authUser) return null;

    const userId = authUser.id;

    if (authUser.role === "PROVIDER") {
        return null;
    }

    const existingUser = await prisma.professionalProfile.findUnique({
        where: { userId }
    });
    if (existingUser) return prisma.user.update({
        where: { id: userId },
        data: {

            role: "PROVIDER",

            professionalProfile: {

                update: {
                    location: input.location,
                    bio: input.bio,
                    experience: input.experience,
                }
                
            }

        }
    });

    const profile = await prisma.professionalProfile.create({
        data: {
            userId,
            location: input.location,
            experience: input.experience,
            bio: input.bio,
            verified: false
        }
    });

    await prisma.user.update({
        where: { id: userId },
        data: { role: "PROVIDER" }
    });

    return profile;
}
