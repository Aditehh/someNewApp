"use client"
import React from 'react'
import { Star } from 'lucide-react'
import { useState } from 'react'
import { createReviewAction } from '@/lib/actions/actions'


interface ReviewProp {
  bookingId: number
}


export default function StarReview({ bookingId }: ReviewProp) {

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState()
  const stararray = [1, 2, 3, 4, 5]

  console.log(rating)




  return (
    <div>
      Leave a Review :)

      <form action={createReviewAction}>
        <input type="hidden" value={bookingId} name='bookingId' />

        <div className='flex gap-1 '>
          <input type="hidden" value={rating} name='rating' />
          {stararray.map((sa) => (
            <Star
              onClick={() => setRating(sa)}
              key={sa}
            >
              star{sa}
            </Star>
          ))}
        </div>

        {/* <textarea name="comment" value={comment} placeholder='Share your experiences'></textarea> */}
      </form>


    </div>
  )
}
