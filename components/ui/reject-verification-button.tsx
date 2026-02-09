"use client";

import { rejectProviderVerificationAction } from "@/lib/actions/actions";
import { Button } from "./button";

export default function RejectProviderVerificationButton({
  providerProfileId,
}: {
  providerProfileId: number;
}) {
  return (
    <form action={rejectProviderVerificationAction} className="space-y-2">
      <input
        type="hidden"
        name="providerProfileId"
        value={providerProfileId}
      />

      <input
        type="text"
        name="rejectionReason"
        required
        placeholder="Reason for rejection"
        className="border px-2 py-1 rounded w-full"
      />

      <Button type="submit" variant="destructive">
        Reject
      </Button>
    </form>
  );
}
