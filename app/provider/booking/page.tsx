"use client";

import { Button } from "@/components/ui/button";

type Booking = {
    id: number;
    user: {
        name: string | null;
        email: string;
    };
    service: {
        title: string;
        price: number;
        duration: number;
    };
    date: Date;
    status: "PENDING" | "CONFIRMED" | "REJECTED";
};

interface ProviderBookingsPageProps {
    bookings: Booking[];    
}

export default function ProviderBookingsPage({
    bookings,
}: ProviderBookingsPageProps) {


    return (
        <div className="min-h-screen bg-slate-50 p-8">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-800">
                        Booking Requests
                    </h1>
                    <p className="text-slate-500 mt-2">
                        Manage incoming service requests
                    </p>
                </div>

                {/* Booking List */}
                <div className="space-y-4">
                    {bookings.length === 0 && (
                        <div className="bg-white p-8 rounded-xl border text-center text-slate-500">
                            No bookings yet.
                        </div>
                    )}

                    {bookings.map((booking) => (
                        <div
                            key={booking.id}
                            className="bg-white rounded-xl border p-6 shadow-sm hover:shadow-md transition"
                        >
                            <div className="flex justify-between items-start">

                                {/* Left Info */}
                                <div>
                                    <h3 className="text-lg font-semibold text-slate-800">
                                        {booking.service.title}
                                    </h3>

                                    <p className="text-sm text-slate-500 mt-1">
                                        Customer: {booking.user.name ?? booking.user.email}
                                    </p>

                                    <div className="mt-3 text-sm text-slate-600 flex gap-6">
                                        <span>Rs. {booking.service.price}</span>
                                        <span>{booking.service.duration} mins</span>
                                        <span>
                                            {new Date(booking.date).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>

                                {/* Status Badge */}
                                <div>
                                    <span
                                        className={`px-3 py-1 text-xs font-medium rounded-full ${booking.status === "PENDING"
                                            ? "bg-yellow-100 text-yellow-700"
                                            : booking.status === "CONFIRMED"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-600"
                                            }`}
                                    >
                                        {booking.status}
                                    </span>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            {booking.status === "PENDING" && (
                                <div className="flex gap-3 mt-6 pt-4 border-t">
                                    <Button className="bg-green-600 hover:bg-green-700 text-white">
                                        Approve
                                    </Button>

                                    <Button
                                        variant="destructive"
                                        className="bg-red-100 text-red-600 hover:bg-red-200"
                                    >
                                        Reject
                                    </Button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}