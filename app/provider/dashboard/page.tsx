// app/provider/dashboard/page.tsx
import Navbar from "@/components/ui/navbar";
import ProviderVerificationForm from "@/components/ui/provider-verification-form";
import { getCurrentUser } from "@/lib/domain";
import { redirect } from "next/navigation";

export default async function ProviderDashboard() {
    const user = await getCurrentUser();
    if (!user) redirect("/");
    if (user.role !== "PROVIDER") redirect("/dashboard");

    const verified = user.professionalProfile?.verified;

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-slate-50 px-6 py-10">
                <div className="max-w-5xl mx-auto space-y-8">
                    {/* Header */}
                    <div className="bg-white rounded-xl shadow-sm p-6 flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-800">
                                Welcome, {user.name}
                            </h1>
                            <p className="text-slate-500">
                                Provider Dashboard
                            </p>
                        </div>

                        <span
                            className={`px-4 py-1 rounded-full text-sm font-medium ${verified
                                    ? "bg-emerald-100 text-emerald-700"
                                    : "bg-amber-100 text-amber-700"
                                }`}
                        >
                            {verified ? "Verified Provider" : "Pending Verification"}
                        </span>
                    </div>

                    {/* Info Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h3 className="text-sm text-slate-500">Location</h3>
                            <p className="mt-2 text-lg font-semibold text-slate-800">
                                {user.professionalProfile?.location}
                            </p>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h3 className="text-sm text-slate-500">Experience</h3>
                            <p className="mt-2 text-lg font-semibold text-slate-800">
                                {user.professionalProfile?.experience} years
                            </p>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h3 className="text-sm text-slate-500">Account Type</h3>
                            <p className="mt-2 text-lg font-semibold text-slate-800">
                                Service Provider
                            </p>
                        </div>
                    </div>

                    {/* CTA */}
                    {!verified && (
                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                            
                            <ProviderVerificationForm />
                            <p className="text-sm text-amber-700 mt-1">
                                Your profile is under review. You'll be notified once verified.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
