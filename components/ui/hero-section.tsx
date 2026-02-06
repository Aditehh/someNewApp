"use client"
import React from 'react'
import AuthButton from './auth-button'
import { Button } from './button'
import { useSession } from '@/lib/auth-client'

export default function HeroSection() {
    const { data: session } = useSession();
    return (
        <>
            {/* Hero Section */}
            <section className="flex flex-col items-center justify-center text-center py-24 px-4 bg-linear-to-b from-indigo-50 to-indigo-100" >
                <h1 className="text-5xl font-bold text-indigo-700 mb-4">
                    Nepal's Local Services at Your Fingertips
                </h1>
                <p className="text-lg text-indigo-600 mb-8 max-w-xl">
                    Discover trusted professionals, book services, and explore local experiences across Nepal.
                </p>
                {
                    !session ? (
                        <div className="px-8 py-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium">

                            <AuthButton />
                        </div>
                    ) : (
                        <Button className="px-8 py-3 bg-amber-400 hover:bg-amber-500 rounded-lg font-medium">
                            Browse Services
                        </Button>
                    )
                }
            </section >
            {/* Features Section */}
            <section className="py-20 px-4">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                    <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
                        <h3 className="text-xl font-semibold mb-2">Trusted Professionals</h3>
                        <p className="text-gray-600">Verified experts across Nepal ready to serve you.</p>
                    </div>
                    <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
                        <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
                        <p className="text-gray-600">Book services in a few clicks, anytime, anywhere.</p>
                    </div>
                    <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
                        <h3 className="text-xl font-semibold mb-2">Verified Reviews</h3>
                        <p className="text-gray-600">See what others say before choosing a service.</p>
                    </div>
                    <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
                        <h3 className="text-xl font-semibold mb-2">Explore Local Services</h3>
                        <p className="text-gray-600">Find top services and experiences in every city.</p>
                    </div>
                </div>
            </section>
        </>
    )
}
