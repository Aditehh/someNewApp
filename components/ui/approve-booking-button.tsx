"use client"

import { approveBookingAction } from "@/lib/actions/actions";
import { Button } from "./button";
import React from "react";

export default function ApproveBookingButton() {
    return (
        <form action={approveBookingAction}>
            <Button type="submit">
                Approve
            </Button>
        </form>
    );
}