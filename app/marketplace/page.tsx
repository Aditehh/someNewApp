// app/marketplace/page.tsx

import Navbar from "@/components/ui/navbar";
import { getPublishedServices } from "@/lib/domain";

export default async function MarketplacePage() {

    const services = await getPublishedServices();

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-slate-50 px-6 py-10">
                <div className="max-w-6xl mx-auto space-y-8">

                    <div>
                        <h1 className="text-3xl font-bold text-slate-800">
                            Marketplace
                        </h1>
                        <p className="text-slate-500 mt-2">
                            Discover services offered by verified professionals.
                        </p>
                    </div>

                    {/* Services Grid */}
                    {services.length === 0 ? (
                        <div className="bg-white rounded-xl shadow-sm p-10 text-center text-slate-500">
                            No services available yet.
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {services.map((service) => (
                                <div
                                    key={service.id}
                                    className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition flex flex-col justify-between"
                                >

                                    <div>
                                        <h3 className="text-lg font-semibold text-slate-800">
                                            {service.title}
                                        </h3>

                                        <p className="text-sm text-slate-500 mt-1">
                                            {service.category?.name}
                                        </p>
                                    </div>

                                    <p className="text-slate-600 text-sm mt-4 line-clamp-2">
                                        {service.description}
                                    </p>

                                    <div className="mt-4 text-sm text-slate-500 space-y-1">
                                        <div>
                                            <span className="font-medium text-slate-700">
                                                Rs. {service.price}
                                            </span>
                                        </div>
                                        <div>
                                            {service.duration} mins
                                        </div>
                                        <div>
                                            Provider: {service.provider.user.name}
                                        </div>
                                    </div>

                                    <button
                                        className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                                    >
                                        Book Now
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                </div>
            </div>
        </>
    );
}
