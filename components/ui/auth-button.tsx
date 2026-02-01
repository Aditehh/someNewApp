"use client"
import { Github, Loader2 } from "lucide-react"
import { Button } from "./button"
import { signIn, useSession } from "@/lib/auth-client"

export default function AuthButton() {
    const { data: session, isPending } = useSession();

    if (isPending) {
        return (
            <div>
                <Loader2 className="animate-spin" />
                Loading...
            </div>
        )
    }
    const signInBtn = async () => {
        await signIn.social({
            provider: "github"
        })
    }

    return (
        <Button onClick={() => signInBtn()}>
            <Github />
            signin with Github
        </Button>
    )
}
