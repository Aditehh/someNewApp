"use client"

import { rejectBookingAction } from "@/lib/actions/actions";
import { Button } from "./button";
import React from "react";

interface RejectBookingProp {
    bookingId: number
}

export default function RejectBookingButton({ bookingId }: RejectBookingProp) {
    return (
        <form action={rejectBookingAction}>
            <input type="hidden" name="bookingId" value={bookingId} />
            <Button type="submit">
                Reject
            </Button>
        </form>
    );
}