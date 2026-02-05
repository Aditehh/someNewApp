"use server";

import { becomeProvider } from "../domain";
import { redirect } from "next/navigation";
import { getCurrentUser } from "../domain";
import { submitVerificationRequest } from "../domain";

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
    const documentType = formdata.get("documentType")?.toString();
    const file = formdata.get("document") as File | null;

    if (!documentType || !file)
        throw new Error("Missing fields")

    const documentUrl = await uploadDocument(file);

    await submitVerificationRequest({
        documentType,
        documentUrl
    })




}