"use client"

import { Star } from "lucide-react"
import { useState } from "react"
import { createReviewAction } from "@/lib/actions/actions"

interface ReviewProp {
  bookingId: number
}

export default function StarReview({ bookingId }: ReviewProp) {

  const [rating, setRating] = useState<number>(0)
  const [hoverRating, setHoverRating] = useState<number | null>(null)

  const starArray = [1, 2, 3, 4, 5]

  return (<div className="bg-white border rounded-xl p-6 mt-6 max-w-md">


    <h3 className="text-lg font-semibold text-slate-800 mb-4">
      Leave a Review
    </h3>

    <form action={createReviewAction} className="space-y-4">

      <input type="hidden" value={bookingId} name="bookingId" />
      <input type="hidden" value={rating} name="rating" />

      {/* Star Rating */}
      <div className="flex gap-2">
        {starArray.map((sa) => {

          const active = sa <= (hoverRating ?? rating)

          return (
            <Star
              key={sa}
              onClick={() => setRating(sa)}
              onMouseEnter={() => setHoverRating(sa)}
              onMouseLeave={() => setHoverRating(null)}
              className={`w-7 h-7 cursor-pointer transition transform hover:scale-110
            ${active ? "text-amber-500 fill-amber-500" : "text-gray-300"}
            `}
            />
          )
        })}
      </div>

      {/* Comment */}
      <textarea
        name="comment"
        placeholder="Share your experience..."
        className="w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300"
      />

      {/* Submit Button */}
      <button
        type="submit"
        disabled={rating === 0}
        className="bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-700 disabled:opacity-40"
      >
        Submit Review
      </button>

    </form>
  </div>


  )
}
