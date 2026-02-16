// components/provider/service-card.tsx

import React from "react";
import { Button } from "./button";
import EditServiceButton from "./edit-service-button";

type ServiceCardProps = {
    service: {
        id: number;
        title: string;
        description: string;
        price: number;
        duration: number;
        status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
        createdAt: Date;
        category: {
            id: number;
            name: string;

        };
    };
};

export default function ServiceCard({ service }: ServiceCardProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition">

            {/* Header */}
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-lg font-semibold text-slate-800">
                        {service.title}
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">
                        {service.category?.name}
                    </p>
                </div>

                {/* Status Badge */}
                <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${service.status === "DRAFT"
                        ? "bg-yellow-100 text-yellow-700"
                        : service.status === "PUBLISHED"
                            ? "bg-green-100 text-green-700"
                            : "bg-slate-200 text-slate-600"
                        }`}
                >
                    {service.status}
                </span>
            </div>

            {/* Description */}
            <p className="text-slate-600 text-sm mt-4 line-clamp-2">
                {service.description}
            </p>

            {/* Details */}
            <div className="flex items-center gap-6 mt-4 text-sm text-slate-500">
                <div>
                    <span className="font-medium text-slate-700">
                        Rs. {service.price}
                    </span>
                </div>
                <div>
                    {service.duration} mins
                </div>
                <div>
                    {new Date(service.createdAt).toLocaleDateString()}
                </div>
            </div>

            {/* Actions Placeholder */}
            <div className="flex gap-3 mt-5 pt-4 border-t">
                <EditServiceButton serviceId={service.id} title={service.title} description={service.description} price={service.price} categoryId={service.category.id} duration={service.duration} />

                <Button variant={"secondary"} className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">
                    Publish
                </Button>

                <Button variant={"destructive"} className="px-4 py-2 text-sm rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition">
                    Delete
                </Button>
            </div>
        </div>
    );
}
