"use client";

import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { Button } from "./button";
import { useEffect, useState } from "react";
import { getCurrentUserAction } from "@/lib/actions/actions";
import { Role } from "@/app/generated/prisma/enums";


interface UserProps {
    id: string;
    name: string | null;
    email: string | null;
    role: Role;
    professionalProfile: {
        verified: boolean;
    } | null;
}


export default function Navbar() {
    const { data: session } = useSession();
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState<UserProps | null>(null);

    useEffect(() => {
        if (!session) {
            setUser(null);
            return;
        }

        getCurrentUserAction().then(setUser);
    }, [session]);

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between h-16 items-center">
                    <Link href="/" className="text-indigo-700 font-bold text-2xl">
                        Nepali Services
                    </Link>

                    <div className="hidden md:flex gap-6 items-center">
                        <Link href="/">Home</Link>
                        <Link href="/services">Browse</Link>

                        {session && user?.role === "USER" && (
                            <>
                                <Link href="/bookings">My Bookings</Link>
                                <Link href="/profile">Profile</Link>
                            </>
                        )}

                        {session && user?.role === "PROVIDER" && (
                            <>
                                <Link href="/provider/dashboard">Dashboard</Link>
                                <Link href="/provider/edit">Edit Profile</Link>
                            </>
                        )}

                        {session ? (
                            <Button variant="destructive">Logout</Button>
                        ) : (
                            <Button>Login</Button>
                        )}

                        {session && user?.role === "PROVIDER" && (
                            user.professionalProfile?.verified ? (
                                <span className="text-green-600 font-medium">
                                    ✔ Verified Provider
                                </span>
                            ) : (
                                <span className="text-yellow-500 font-medium">
                                    ⏳ Verification Pending
                                </span>
                            )
                        )}



                    </div>

                    <button
                        className="md:hidden"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        ☰
                    </button>
                </div>
            </div>
        </nav>
    );
}
