import prisma from './db';
import { auth } from './auth';
import { headers } from 'next/headers';
import { getCurrentUserAction } from './actions/actions';
import { VerificationDocumentType, VerificationStatus } from '@/app/generated/prisma/enums';
import { ProfessionalProfileScalarFieldEnum } from '@/app/generated/prisma/internal/prismaNamespace';


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
            id: user.professionalProfile.id,
            verified: user.professionalProfile.verified,
            location: user.professionalProfile.location,
            experience: user.professionalProfile.experience,
            VerificationStatus: user.professionalProfile.status



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
            verified: false,
            status: "NOT_REQUESTED",

        }
    });

    await prisma.user.update({
        where: { id: userId },
        data: {
            role: "PROVIDER",
        },

    });

    return profile;
}


export async function approveProviderVerification(providerProfileId: number) {

    const authUser = await getCurrentUser();
    if (!authUser) return null;

    if (authUser.role !== "ADMIN") throw new Error("Forbidden")

    return prisma.professionalProfile.update({
        where: {
            id: providerProfileId,
        },
        data: {
            verified: true
        }
    })

}


export async function submitVerificationRequest(input: {

    documentType: VerificationDocumentType,
    documentNumber: string
}) {

    const authUser = await getCurrentUser();
    if (!authUser) throw new Error("unauthenticated");

    if (authUser.role !== "PROVIDER") throw new Error("must be a provider");

    if (authUser.professionalProfile?.verified) {
        throw new Error("Already verified")
    };

    const providerProfile = await prisma.professionalProfile.findUnique({
        where: {
            userId: authUser.id,
        }
    })

    if (providerProfile?.status === "NOT_REQUESTED") {
        return prisma.professionalProfile.update({
            where: {
                userId: authUser.id,
            },
            data: {
                status: "PENDING"
            }
        })
    }

    if (!providerProfile) throw new Error("provider not found");

    const existingRequest = await prisma.providerVerification.findUnique({
        where: {
            providerId: providerProfile.id
        }
    })

    if (existingRequest && existingRequest.status == "PENDING") {
        throw new Error("User already has a request that is pending ")
    }

    return await prisma.providerVerification.create({
        data: ({
            providerId: providerProfile.id,
            documentType: input.documentType,
            documentNumber: input.documentNumber,
            status: "PENDING",

        })
    })


}

