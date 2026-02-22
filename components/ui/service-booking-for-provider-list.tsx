import { Button } from "./button";

import React from 'react'


type Booking = {
    id: number;
    user: {
        name: string | null;
        email: string;
    };
    service: {
        title: string;
        price: number;
        duratin: number;
    };
    date: Date;
    status: "PENDING" | "CONFIRMED" | "REJECTED";
};

interface ProviderBookingsPageProps {
    bookings: Booking
}



export default function ServiceBookingForProviderList({
    bookings,
}: ProviderBookingsPageProps) {



    return (
        <div>







        </div>
    )
}
