import React from 'react'
import { completeBookingAction } from '@/lib/actions/actions'
import { Button } from './button'

interface BookingCompleteProps {
  bookingId: number
}

export default function BookingCompleteButton({ bookingId }: BookingCompleteProps) {
  return (
    <div>
      <form action={completeBookingAction}>
        <input type="hidden" name="bookingId" value={bookingId} />
        <Button type='submit'>Complete</Button>
      </form>
    </div>
  )
}
