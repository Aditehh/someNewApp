"use client";

import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { Button } from "./button";
import { useEffect, useState } from "react";
import { getCurrentUserAction } from "@/lib/actions/actions";

interface UserProps {
    role: string,
    // verified: boolean
}

export default function Navbar() {
    const { data: session } = useSession();
    const [isOpen, setIsOpen] = useState(false);
const [user, setUser] = useState<UserProps | null>(null);

    useEffect(() => {
getCurrentUserAction().then(setUser);
    }, []);

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Brand */}
                    <Link href="/" className="text-indigo-700 font-bold text-2xl">
                        Nepali Services
                    </Link>
   
                    {/* Desktop Links */}
                    <div className="hidden md:flex space-x-6 items-center">
                        <Link href="/" className="text-gray-700 hover:text-indigo-600">
                            Home
                        </Link>
                        <Link href="/services" className="text-gray-700 hover:text-indigo-600">
                            Browse Services
                        </Link>

                        {session ? (
                            <>
                                {user.role === "USER" && (
                                    <>
                                        <Link href="/bookings" className="text-gray-700 hover:text-indigo-600">
                                            My Bookings
                                        </Link>
                                        <Link href="/profile" className="text-gray-700 hover:text-indigo-600">
                                            Profile
                                        </Link>
                                    </>
                                )}

                                {user.role === "PROVIDER" && (
                                    <>
                                        <Link href="/provider/dashboard" className="text-gray-700 hover:text-indigo-600">
                                            Dashboard
                                        </Link>
                                        <Link href="/provider/edit" className="text-gray-700 hover:text-indigo-600">
                                            Edit Profile
                                        </Link>
                                        {/* <span className="text-sm text-amber-500">
                                            {user.verified ? "Verified" : "Pending Verification"}
                                        </span> */}
                                    </>
                                )}

                                <Button
                                    onClick={() => {/* logout function */ }}
                                    className="bg-red-500 hover:bg-red-600 text-white"
                                >
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                                Login
                            </Button>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-700 focus:outline-none"
                        >
                            {isOpen ? "✖" : "☰"}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden px-4 pb-4 space-y-2">
                    <Link href="/" className="block text-gray-700 hover:text-indigo-600">
                        Home
                    </Link>
                    <Link href="/services" className="block text-gray-700 hover:text-indigo-600">
                        Browse Services
                    </Link>
                    {session && user.role === "USER" && (
                        <>
                            <Link href="/bookings" className="block text-gray-700 hover:text-indigo-600">
                                My Bookings
                            </Link>
                            <Link href="/profile" className="block text-gray-700 hover:text-indigo-600">
                                Profile
                            </Link>
                        </>
                    )}
                    {session && user.role === "PROVIDER" && (
                        <>
                            <Link href="/provider/dashboard" className="block text-gray-700 hover:text-indigo-600">
                                Dashboard
                            </Link>
                            <Link href="/provider/edit" className="block text-gray-700 hover:text-indigo-600">
                                Edit Profile
                            </Link>
                            {/* <span className="block text-sm text-amber-500">
                                {user.verified ? "Verified" : "Pending Verification"}
                            </span> */}
                        </>
                    )}
                    {!session && (
                        <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                            Login
                        </Button>
                    )}
                </div>
            )}
        </nav>
    );
}
