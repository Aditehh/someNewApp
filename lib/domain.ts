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
            status: user.professionalProfile.status



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
    if (!authUser) throw new Error("Unauthenticated");

    if (authUser.role !== "ADMIN") {
        throw new Error("Forbidden");
    }

    // 1️⃣ Get provider profile being approved
    const providerProfile = await prisma.professionalProfile.findUnique({
        where: { id: providerProfileId },
    });

    if (!providerProfile) {
        throw new Error("Provider profile not found");
    }

    if (providerProfile.verified) {
        throw new Error("Provider already verified");
    }

    // 2️⃣ Find pending verification request
    const verificationRequest = await prisma.providerVerification.findUnique({
        where: { providerId: providerProfile.id },
    });

    if (!verificationRequest || verificationRequest.status !== "PENDING") {
        throw new Error("No pending verification request");
    }

    // 3️⃣ Approve verification request
    await prisma.providerVerification.update({
        where: { id: verificationRequest.id },
        data: {
            status: "APPROVED",
            reviewedAt: new Date(),
        },
    });

    // 4️⃣ Mark provider as verified
    await prisma.professionalProfile.update({
        where: { id: providerProfile.id },
        data: {
            verified: true,
            status: "APPROVED",
        },
    });

    return { success: true };
}


// export async function submitVerificationRequest(input: {

//     documentType: VerificationDocumentType,
//     documentNumber: string
// }) {

//     const authUser = await getCurrentUser();
//     if (!authUser) throw new Error("unauthenticated");

//     if (authUser.role !== "PROVIDER") throw new Error("must be a provider");

//     if (authUser.professionalProfile?.verified) {
//         throw new Error("Already verified")
//     };

//     const providerProfile = await prisma.professionalProfile.findUnique({
//         where: {
//             userId: authUser.id,
//         }
//     })



//     if (!providerProfile) throw new Error("provider not found");

//     const existingRequest = await prisma.providerVerification.findUnique({
//         where: {
//             providerId: providerProfile.id
//         }
//     })

//     if (existingRequest && existingRequest.status == "PENDING") {
//         throw new Error("User already has a request that is pending ")
//     }

//     if (providerProfile?.status === "NOT_REQUESTED") {
//         return prisma.professionalProfile.update({
//             where: {
//                 userId: authUser.id,
//             },
//             data: {
//                 status: "PENDING"
//             }
//         })
//     }

//     return await prisma.providerVerification.create({
//         data: ({
//             providerId: providerProfile.id,
//             documentType: input.documentType,
//             documentNumber: input.documentNumber,
//             status: "PENDING",

//         })
//     })



// }


export async function submitVerificationRequest(input: {
    documentType: VerificationDocumentType;
    documentNumber: string;
}) {
    const authUser = await getCurrentUser();
    if (!authUser) throw new Error("unauthenticated");

    if (authUser.role !== "PROVIDER") {
        throw new Error("must be a provider");
    }

    const providerProfile = await prisma.professionalProfile.findUnique({
        where: { userId: authUser.id },
    });

    if (!providerProfile) {
        throw new Error("provider not found");
    }

    if (providerProfile.verified) {
        throw new Error("Already verified");
    }

    // Prevent duplicate pending requests
    const existingRequest = await prisma.providerVerification.findFirst({
        where: {
            providerId: providerProfile.id,
            status: "PENDING",
        },
    });

    if (existingRequest) {
        throw new Error("Verification request already pending");
    }

    // Create verification request AND update profile status
    const verificationRequest = await prisma.providerVerification.create({
        data: {
            providerId: providerProfile.id,
            documentType: input.documentType,
            documentNumber: input.documentNumber,
            status: "PENDING",
        },
    });

    await prisma.professionalProfile.update({
        where: { id: providerProfile.id },
        data: {
            status: "PENDING",
        },
    });

    return verificationRequest;
}




export async function rejectProviderVerification(providerProfileId: number) {

    const authUser = await getCurrentUser();
    if (!authUser) throw new Error("Unauthenticated")

    if (authUser.role !== "ADMIN") {
        throw new Error("Forbidden");
    }

    const providerProfile = await prisma.professionalProfile.findUnique({
        where: {
            id: providerProfileId
        }
    });

    if (!providerProfile) {
        throw new Error("Provider Profile not found")
    };

    if (providerProfile.verified) {
        throw new Error("Provider already verified")
    };

    const verificationRequest = await prisma.providerVerification.findUnique({
        where: { providerId: providerProfile.id }
    });

    if (verificationRequest?.status == "REJECTED") {
        throw new Error("Already rejected should make a new request again")
    }

    if (!verificationRequest || verificationRequest.status !== "PENDING") {
        throw new Error("No pending verification request")
    };



    await prisma.providerVerification.update({
        where: { id: verificationRequest.id },
        data: {
            status: "REJECTED",
            reviewedAt: new Date(),
            rejectionReason: input.rejectionReason,
        }
    });

    await prisma.professionalProfile.update({
        where: { id: providerProfile.id },
        data: {
            verified: false,
            status: "REJECTED"
        }
    })




}










