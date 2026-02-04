"use server";

import { becomeProvider } from "../domain";
import { redirect } from "next/navigation";
import { getCurrentUser } from "../domain";
import { string } from "better-auth";
import { auth } from "../auth";
import { headers } from "next/headers";
import prisma from "../db";

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
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) return null;

    const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
        },
    });

    return user;
}