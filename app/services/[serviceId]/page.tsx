import CreateBookingsButton from "@/components/ui/create-bookings-button";
import { getServiceById } from "@/lib/domain";
import Navbar from "@/components/ui/navbar";
import EmojiReview from "@/components/ui/star-review";



export default async function ServicePage({
    params,
}: {
    params: Promise<{ serviceId: string }>;
}) {
    const { serviceId } = await params;

    const service = await getServiceById(Number(serviceId));



    if (!service) {
        return (<div className="min-h-screen flex items-center justify-center text-slate-500">
            Service not found </div>
        );
    }

    return (
        <>

            <Navbar />

            <div className="min-h-screen bg-slate-50 px-6 py-12">
                <div className="max-w-4xl mx-auto">

                    <div className="bg-white rounded-2xl shadow-sm border p-8 space-y-6">

                        {/* Title */}
                        <div>
                            <h1 className="text-3xl font-bold text-slate-800">
                                {service.title}
                            </h1>

                            <p className="text-slate-500 mt-2">
                                Category: {service.category?.name}
                            </p>
                        </div>

                        {/* Description */}
                        <div>
                            <h2 className="text-lg font-semibold text-slate-700 mb-2">
                                Description
                            </h2>
                            <p className="text-slate-600 leading-relaxed">
                                {service.description}
                            </p>
                        </div>

                        {/* Service Info */}
                        <div className="grid sm:grid-cols-3 gap-6 pt-4 border-t">

                            <div>
                                <p className="text-sm text-slate-500">Price</p>
                                <p className="text-lg font-semibold text-slate-800">
                                    Rs. {service.price}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-slate-500">Duration</p>
                                <p className="text-lg font-semibold text-slate-800">
                                    {service.duration} minutes
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-slate-500">Provider</p>
                                <p className="text-lg font-semibold text-slate-800">
                                    {service.provider.user.name}
                                </p>
                            </div>

                        </div>

                        {/* Booking section */}
                        <div className="pt-6 border-t flex items-center justify-between">

                            <div>
                                <p className="text-slate-600 text-sm">
                                    Ready to book this service?
                                </p>
                            </div>

                            <CreateBookingsButton serviceId={service.id} />

                        </div>
                        <EmojiReview bookingId={} />
                    </div>


                </div>

            </div>
        </>

    );
}
