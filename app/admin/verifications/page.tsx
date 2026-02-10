import { getPendingProviderVerifications } from "@/lib/domain";
import ApproveVerificationButton from "@/components/ui/approve-verification-button";
import RejectProviderVerificationButton from "@/components/ui/reject-verification-button";


export default async function AdminVerificationsPage() {

    const requests = await getPendingProviderVerifications();

    return (
        <div className="p-8 space-y-6">
            <h1 className="text-2xl font-bold">Provider Verification Requests</h1>

            {requests.length === 0 && (
                <p className="text-muted-foreground">
                    No pending verification requests.
                </p>
            )}

            {requests.map((req) => (
                <div
                    key={req.id}       
                    className="border rounded-lg p-4 space-y-3 bg-white"
                >
                    <div>
                        <p className="font-semibold">{req.provider.user.name}</p>
                        <p className="text-sm text-muted-foreground">
                            {req.provider.user.email}
                        </p>
                    </div>

                    <div className="text-sm">
                        <p>Document: {req.documentType}</p>
                        <p>Number: {req.documentNumber}</p>
                        <p>Submitted: {new Date(req.submittedAt).toLocaleDateString()}</p>
                    </div>

                    <div className="flex gap-3">
                        <ApproveVerificationButton providerProfileId={req.provider.id} />
                        <RejectProviderVerificationButton providerProfileId={req.provider.id} />
                    </div>
                </div>
            ))}
        </div>
    );
}
