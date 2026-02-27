"use client"

import { rejectBookingAction } from "@/lib/actions/actions";
import { Button } from "./button";
import React from "react";

export default function RejectBookingButton() {
    return (
        <form action={rejectBookingAction}>
            <Button type="submit">
                Reject
            </Button>
        </form>
    );
}