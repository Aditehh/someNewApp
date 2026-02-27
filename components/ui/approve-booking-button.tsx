"use client"

import { approveBookingAction } from "@/lib/actions/actions";
import { Button } from "./button";
import React from "react";

interface ApproveBookingProp {
    bookingId: number
}

export default function ApproveBookingButton({ bookingId }: ApproveBookingProp) {
    return (
        <form action={approveBookingAction}>
            <input type="hidden" name="bookingId" value={bookingId} />
            <Button type="submit">
                Approve
            </Button>   
        </form>
    );
}