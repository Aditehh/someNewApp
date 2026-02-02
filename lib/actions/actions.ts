"use server";

import { becomeProvider } from "../domain";
import { redirect } from "next/navigation";
import { getCurrentUser } from "../domain";
import { string } from "better-auth";

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


export async function getCurrentUserAction(role: string) {
    const user = await getCurrentUser();
    return user;

}