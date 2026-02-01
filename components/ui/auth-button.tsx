"use client"
import { Github } from "lucide-react"
import { Button } from "./button"
import { signIn, useSession } from "@/lib/auth-client"

export default function AuthButton() {
    const { data: session, isPending } = useSession();
    const signInBtn = async () => {
        await signIn.social({
            provider: "github"
        })
    }

    return (
        <Button>
            <Github />
            signin with Github
        </Button>
    )
}
