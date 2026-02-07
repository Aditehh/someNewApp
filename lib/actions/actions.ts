"use server";

import { becomeProvider, submitVerificationRequest } from "../domain";
import { redirect } from "next/navigation";
import { getCurrentUser } from "../domain";
import { VerificationDocumentType } from "@/app/generated/prisma/enums";
import { revalidatePath } from "next/cache";

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



