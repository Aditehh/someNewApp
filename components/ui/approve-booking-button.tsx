import { approveBookingAction } from "@/lib/actions/actions";
import { Button } from "./button";

import React from 'react'

interface ApproveBookingProps {
    bookingId: number;
    date: string
}

export default function ApproveBookingButton({ bookingId, date }: ApproveBookingProps) {
    return (
        <div>
            <form action={approveBookingAction}>

                <Button>

                </Button>
            </form>
        </div>
    )
}
