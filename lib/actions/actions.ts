"use server";

import { approveProviderVerification, becomeProvider, submitVerificationRequest } from "../domain";
import { redirect } from "next/navigation";
import { getCurrentUser } from "../domain";
import { VerificationDocumentType } from "@/app/generated/prisma/enums";
import { revalidatePath } from "next/cache";
import { rejectProviderVerification } from "../domain";
import { createService } from "../domain";
import prisma from "../db";
import { editService } from "../domain";
import { holdDelete } from "../domain";
import { publishService } from "../domain";



export async function becomeProviderAction(formdata: FormData): Promise<void> {
    const location = formdata.get("location")?.toString();
    const bio = formdata.get("bio")?.toString();
    const experience = Number(formdata.get("experience") ?? 0);

    if (!location) {
        throw new Error("Location is required");
    }

    await becomeProvider({
        location,
        experience,
        bio
    });

    redirect("/provider/dashboard");
}


export async function getCurrentUserAction() {
    // const session = await auth.api.getSession({
    //     headers: await headers(),
    // });

    // if (!session) return null;

    // const user = await prisma.user.findUnique({
    //     where: { id: session.user.id },
    //     select: {
    //         id: true,
    //         name: true,
    //         email: true,
    //         role: true,
    //         // professionalProfile: 
    //         professionalProfile: true,

    //     },
    // });

    // return user;
    return getCurrentUser();
}

export async function submitVerificationRequestAction(formdata: FormData) {
    const rawType = formdata.get("documentType")
    const documentNumber = formdata.get("documentNumber")?.toString();

    if (!documentNumber || !rawType) {
        throw new Error("missing fields")
    }

    const documentType = rawType.toString() as VerificationDocumentType;




    if (!Object.values(VerificationDocumentType).includes(documentType)) {
        throw new Error("Invalid document type");
    }



    await submitVerificationRequest({
        documentType,
        documentNumber,

    });

    // return {success: true}
    revalidatePath("/provider/dashboard")


}

export async function rejectProviderVerificationAction(formdata: FormData) {

    const rawId = formdata.get("providerProfileId");
    const rejectionReason = formdata.get("rejectionReason");

    if (!rawId || !rejectionReason) {
        throw new Error("Missing fields")
    }

    const providerProfileId = Number(rawId);

    if (Number.isNaN(providerProfileId)) {
        throw new Error("Invalid ProviderProfileId")
    }

    if (rejectionReason.toString().trim().length < 3) {
        throw new Error("Rejection reason too short")
    }


    await rejectProviderVerification(providerProfileId, { rejectionReason: rejectionReason.toString() });

}


export async function approveProviderVerificationAction(formdata: FormData) {

    const rawId = formdata.get("providerProfileId");

    if (!rawId) {
        throw new Error("missing providerId")
    }

    const providerProfileId = Number(rawId)


    if (isNaN(providerProfileId)) throw new Error("Invalid providerProfileId")

    await approveProviderVerification(providerProfileId);

    revalidatePath("/admin/verification")

}


export async function createServiceAction(formdata: FormData) {

    const title = (formdata.get("title") as string).trim();
    const description = (formdata.get("description") as string).trim();
    const rawPrice = formdata.get("price");
    const rawCategoryId = formdata.get("categoryId");
    const rawDuration = formdata.get("duration");

    if (!title || !description || !rawPrice || !rawCategoryId || !rawDuration) {
        throw new Error("Missing fields")
    }


    const price = Number(rawPrice)
    const categoryId = Number(rawCategoryId)
    const duration = Number(rawDuration)



    if (isNaN(price)) throw new Error("Invalid price");
    if (isNaN(categoryId)) throw new Error("Invalid categoryId")
    if (isNaN(duration)) throw new Error("Invalid duration");

    const category = await prisma.category.findUnique({
        where: {
            id: categoryId,
        }
    });

    if (!categoryId) throw new Error("category not found")

    if (title.length >= 11) throw new Error("Title too long");
    if (description.length >= 50) throw new Error("Description too long");
    if (price < 0 && price > 50000) throw new Error("Invalid");



    await createService({
        title,
        description,
        price,
        categoryId,
        duration
    });

}

export async function editServiceAction(serviceId: number, title: string, description: string, price: number, duration: number, categoryId: number) {
    await editService(serviceId, title, description, price, categoryId, duration);

}

export async function holdDeleteServiceAction(serviceId: number) {
    await holdDelete(serviceId);
}

export async function publishServiceAction(serviceId: number) {
    await publishService(serviceId);
}