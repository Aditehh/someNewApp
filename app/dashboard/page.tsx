// app/dashboard/page.tsx
import BecomeProviderForm from "@/components/ui/become-provider-form";
import Navbar from "@/components/ui/navbar";
import { getCurrentUser } from "@/lib/domain";
import { redirect } from "next/navigation";
import { getMyServices } from "@/lib/domain";
import ServiceCard from "@/components/ui/service-card";

export default async function UserDashboard() {

    const user = await getCurrentUser();
    


    if (!user) redirect("/");

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-slate-50 px-6 py-10">
                <div className="max-w-4xl mx-auto space-y-8">
                    {/* Header */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <h1 className="text-2xl font-bold text-slate-800">
                            Welcome, {user.name}
                        </h1>
                        <p className="text-slate-500 mt-1">
                            Manage your account and services from here
                        </p>
                    </div>

                    {/* Become Provider Section */}
                    <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
                        <h2 className="text-xl font-semibold text-slate-800">
                            Become a Service Provider
                        </h2>
                        <p className="text-slate-600 text-sm">
                            Offer your skills, reach more customers, and grow your income.
                        </p>

                        <div className="border-t pt-4">
                            <BecomeProviderForm />
                        </div>
                    </div>

                   

                </div>
            </div>
        </>
    );
}
