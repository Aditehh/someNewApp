import prisma from './db';
import { auth } from './auth';
import { headers } from 'next/headers';
import { getCurrentUserAction } from './actions/actions';
import { VerificationDocumentType, VerificationStatus } from '@/app/generated/prisma/enums';
import { ProfessionalProfileScalarFieldEnum } from '@/app/generated/prisma/internal/prismaNamespace';
import { includes, success } from 'better-auth';


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

    const providerProfile = await prisma.professionalProfile.findUnique({
        where: { id: providerProfileId },
    });

    if (!providerProfile) {
        throw new Error("Provider profile not found");
    }

    if (providerProfile.verified) {
        throw new Error("Provider already verified");
    }

    const verificationRequest = await prisma.providerVerification.findUnique({
        where: { providerId: providerProfile.id },
    });

    if (!verificationRequest || verificationRequest.status !== "PENDING") {
        throw new Error("No pending verification request");
    }

    await prisma.providerVerification.update({
        where: { id: verificationRequest.id },
        data: {
            status: "APPROVED",
            reviewedAt: new Date(),
        },
    });

    await prisma.professionalProfile.update({
        where: { id: providerProfile.id },
        data: {
            verified: true,
            status: "APPROVED",
        },
    });

    return { success: true };
}




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

    // prevent duplicate pending requests
    const existingRequest = await prisma.providerVerification.findFirst({
        where: {
            providerId: providerProfile.id,
            status: "PENDING",
        },
    });

    if (existingRequest) {
        throw new Error("Verification request already pending");
    }

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




export async function rejectProviderVerification(providerProfileId: number, input: { rejectionReason: string }) {

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
    return { success: true }

}



export async function getPendingProviderVerifications() {
    const authUser = await getCurrentUser();
    if (!authUser) throw new Error("Unauthenticated")

    if (authUser.role !== "ADMIN") {
        throw new Error("forbidden")
    };




    const person = await prisma.providerVerification.findMany({
        where: {
            status: "PENDING",
            provider: {
                verified: false,
                status: "PENDING",
            },
        },
        include: {
            provider: {
                include: {
                    user: {
                        select: {
                            email: true,
                            name: true, // optional but useful
                        },
                    },
                },
            },
        },
        orderBy: {
            submittedAt: "desc",
        },
    });


    return person;

}




export async function getAllCategories() {
    const categories = await prisma.category.findMany({})

    return categories;
}



export async function createService(input: {
    title: string,
    description: string,
    price: number,
    categoryId: number,
    duration: number
}) {
    const authUser = await getCurrentUser();
    if (!authUser) throw new Error("unauthenticated");

    const serviceProvider = await prisma.professionalProfile.findUnique({
        where: {
            userId: authUser.id
        }
    });

    if (!serviceProvider) throw new Error("is not a service provider");

    if (!serviceProvider.verified) throw new Error("is not a verified provider");

    if (serviceProvider.status !== "APPROVED") throw new Error("is not an approved provider");


    const draftcount = await prisma.service.count({
        where: { providerId: serviceProvider.id, status: "DRAFT" }
    });

    if (draftcount >= 5) throw new Error(" you have reached the max number of draft services");

    const service = await prisma.service.create({

        data: {
            title: input.title,
            description: input.description,
            price: input.price,
            categoryId: input.categoryId,
            providerId: serviceProvider.id,
            duration: input.duration,
            status: "DRAFT",
        }

    });


    return service;

}



export async function publishService(serviceId: number) {
    const authUser = await getCurrentUser();
    if (!authUser) throw new Error("Unauthorized");

    const serviceProvider = await prisma.professionalProfile.findUnique({
        where: {
            userId: authUser.id
        }
    });

    if (!serviceProvider) throw new Error("is not a service provider");

    if (!serviceProvider.verified) throw new Error("is not a verified provider");

    if (serviceProvider.status != "APPROVED") throw new Error("is not an approved provider");


    const service = await prisma.service.updateMany({
        where: {
            id: serviceId,
            providerId: serviceProvider.id,
            status: "DRAFT"
        },
        data: {
            status: "PUBLISHED"

        }
    });

    if (service.count === 0) {
        throw new Error("Service not found or cannot be archived");
    }

    return { success: true };
}



export async function archiveService(serviceId: number) {
    const authUser = await getCurrentUser();
    if (!authUser) throw new Error("Unauthorized");

    const serviceProvider = await prisma.professionalProfile.findUnique({
        where: { userId: authUser.id }
    });

    if (!serviceProvider) throw new Error("Not a service provider");

    if (!serviceProvider.verified)
        throw new Error("Provider not verified");

    if (serviceProvider.status !== "APPROVED")
        throw new Error("Provider not approved");

    const result = await prisma.service.updateMany({
        where: {
            id: serviceId,
            providerId: serviceProvider.id,
            status: { not: "ARCHIVED" }  // prevent re-archiving
        },
        data: {
            status: "ARCHIVED"
        }
    });

    if (result.count === 0) {
        throw new Error("Service not found or cannot be archived");
    }

    return { success: true };
}



export async function getMyServices() {
    const authUser = await getCurrentUser();
    if (!authUser) {
        throw new Error("Unauthenticated");
    }

    const serviceProvider = await prisma.professionalProfile.findUnique({
        where: { userId: authUser.id }
    });

    if (!serviceProvider) {
        throw new Error("You are not a service provider");
    }

    if (!serviceProvider.verified) {
        throw new Error("Provider is not verified");
    }

    if (serviceProvider.status !== "APPROVED") {
        throw new Error("Provider is not approved");
    }

    const myServices = await prisma.service.findMany({
        where: {
            providerId: serviceProvider.id
        },
        include: {
            category: true
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    return myServices;
}




export async function editService(serviceId: number, title: string, description: string, price: number, categoryId: number, duration: number) {

    const authUser = await getCurrentUser();
    if (!authUser) throw new Error("Unauthorized");

    const serviceProvider = await prisma.professionalProfile.findFirst({
        where: {
            userId: authUser.id
        }
    });

    if (!serviceProvider) throw new Error("Not a service provider");

    if (!serviceProvider.verified)
        throw new Error("Provider not verified");

    if (serviceProvider.status !== "APPROVED")
        throw new Error("Provider not approved");

    const service = await prisma.service.updateMany({
        where: {
            providerId: serviceProvider.id,
            id: serviceId,
            status: "DRAFT"
        },
        data: { title, description, price, categoryId, duration }
    })

    if (service.count === 0) {
        throw new Error("Service not found or cannot be edited");
    }



    return { success: true };

}


export async function holdDelete(serviceId: number) {
    const authUser = await getCurrentUser();
    if (!authUser) throw new Error("Unauthorized");

    const serviceProvider = await prisma.professionalProfile.findFirst({
        where: {
            userId: authUser.id
        }
    });

    if (!serviceProvider) throw new Error("Not a service provider");

    if (!serviceProvider.verified)
        throw new Error("Provider not verified");

    if (serviceProvider.status !== "APPROVED")
        throw new Error("Provider not approved");

    const result = await prisma.service.deleteMany({
        where: {
            id: serviceId,
            providerId: serviceProvider.id,
            status: "DRAFT"
        }
    });

    if (result.count === 0) {
        throw new Error("Service not found or cannot be deleted");
    }

    return { success: true };
}



export async function getPublishedServices() {

    const publishedservices = await prisma.service.findMany({
        where: {
            status: "PUBLISHED"
        },
        include: {
            category: true,
            provider: {
                include: {
                    user: true
                },
            }
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    return publishedservices;

}



export async function createBookings(serviceId: number) {

    const authUser = await getCurrentUser();
    if (!authUser) throw new Error("unauthorized");

    const service = await prisma.service.findUnique({
        where: {
            id: serviceId
        }
    });

    if (!service) throw new Error("no service found");

    const bookings = await prisma.booking.create({
        data: {
            userId: authUser.id,
            serviceId: service.id,
            providerId: service.providerId,
            status: "PENDING",
            date: new Date(),
        }
    })
}