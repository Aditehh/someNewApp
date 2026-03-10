import CreateBookingsButton from "@/components/ui/create-bookings-button";
import { getServiceById } from "@/lib/domain";
import Navbar from "@/components/ui/navbar";
import EmojiReview from "@/components/ui/star-review";
import { getUserBookingForService } from "@/lib/domain";
import { getAllReviewsAndComments } from "@/lib/domain";
import Image from "next/image";



export default async function ServicePage({
    params,
}: {
    params: Promise<{ serviceId: string }>;
}) {
    const { serviceId } = await params;

    const booking = await getUserBookingForService(Number(serviceId))

    const service = await getServiceById(Number(serviceId));

    const allreviews = await getAllReviewsAndComments(Number(serviceId))



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
                        {booking &&
                            <EmojiReview bookingId={booking.id} />
                        }


                        <div className="mt-10 space-y-6">

                            <h2 className="text-2xl font-semibold text-slate-800">
                                Reviews
                            </h2>

                            {allreviews.length === 0 && (<div className="bg-white border rounded-xl p-6 text-slate-500 text-sm">
                                No reviews yet. Be the first to share your experience. </div>
                            )}

                            {allreviews.map((rev) => (<div
                                key={rev.id}
                                className="bg-white border rounded-xl p-6 shadow-sm space-y-3"
                            >


                                {/* User + Rating */}
                                <div className="flex items-center justify-between">

                                    <div className="flex items-center gap-3">
                                        <img
                                            src={rev.user.image ?? ""}
                                            alt={rev.user.name ?? "User"}
                                            width={32}
                                            height={32}
                                            className="rounded-full"
                                        />

                                        <span className="font-medium text-slate-800">
                                            {rev.user.name ?? "Anonymous"}
                                        </span>
                                    </div>

                                    <span className="text-amber-500 font-medium">
                                        {"⭐".repeat(rev.rating)}
                                    </span>

                                </div>

                                {/* Comment */}
                                {rev.comment && (
                                    <p className="text-slate-600 text-sm leading-relaxed">
                                        {rev.comment}
                                    </p>
                                )}

                                {/* Date */}
                                <p className="text-xs text-slate-400">
                                    {new Date(rev.createdAt).toLocaleDateString()}

                                </p>
   {/* bugatti pursport  */}

   
                            </div>


                            ))}

                        </div>


                    </div>

                </div>

            </div>
        </>

    );
}
