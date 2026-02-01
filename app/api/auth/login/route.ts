import { syncUser } from "@/lib/domain";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const { email, name, image } = body;

        if (!email || !name) {
            return NextResponse.json(
                { error: "email and name are required" },
                { status: 400 }
            )
        }

        const user = await syncUser(email, name, image)

        return NextResponse.json({ user }, { status: 200 })

    } catch (error) {

        console.error("Login error:", error)
        return NextResponse.json({
            error: "internal server error"
        },
            {
                status: 500
            })

    }

}