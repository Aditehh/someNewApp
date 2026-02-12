import { getAllCategories } from '@/lib/domain'
import React from 'react'
import { createServiceAction } from '@/lib/actions/actions';

export default async function CreateServiceForm() {

    const categories = await getAllCategories();


    return (
        <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
            <h2 className="text-2xl font-bold mb-6 text-center">Create New Service</h2>

            <form action={createServiceAction} className="space-y-4">
                {/* Title */}
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Service Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        placeholder="Enter service title"
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                {/* Description */}
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        name="description"
                        id="description"
                        placeholder="Describe your service"
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                {/* Price */}
                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                        Price
                    </label>
                    <input
                        type="number"
                        name="price"
                        id="price"
                        placeholder="Enter price in $"
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                {/* Category */}
                <div>
                    <label htmlFor="categoryId">Category</label>
                    <select name="categoryId" id="categoryId" required>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>

                </div>

                {/* Duration */}
                <div>
                    <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                        Duration (hours)
                    </label>
                    <input
                        type="number"
                        name="duration"
                        id="duration"
                        placeholder="Enter service duration"
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                {/* Submit Button */}
                <div className="mt-6">
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Create Service
                    </button>
                </div>
            </form>
        </div>
    )
}
