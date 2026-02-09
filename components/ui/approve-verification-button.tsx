"use client";

import { approveProviderVerificationAction } from "@/lib/actions/actions";
import { Button } from "./button";
import { Input } from "./input";

export default function ApproveVerificationButton({
    providerProfileId,
}: {
    providerProfileId: number;
}) {
    return (
        <form action={approveProviderVerificationAction}>
            <Input
                type="hidden"
                name="providerProfileId"
                value={providerProfileId}
            />
            <Button type="submit" variant="outline">
                Approve
            </Button>
        </form>
    );
}
