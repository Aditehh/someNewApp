// components/RejectionFormAdmin.tsx
import { rejectProviderVerificationAction } from "@/lib/actions/actions";

export default function RejectionFormAdmin({
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
                className="border px-2 py-1 w-full"
            />

            <button type="submit" className="bg-red-600 text-white px-4 py-1">
                Reject Verification
            </button>
        </form>
    );
}
