"use client"

import { createBookingsAction } from '@/lib/actions/actions'
import { Button } from './button'
import submitButton from './submitButton'

interface CreateBookingProp {
    serviceId: number;
}

export default function CreateBookingsButton({ serviceId }: CreateBookingProp) {
    return (
        <div>
            <form action={createBookingsAction}>
                <div className='flex flex-col gap-2'>

                    <input type="hidden" name='serviceId' value={serviceId} />

                    <input type="date" name='date' />
                    <submitButton />

                </div>
            </form>
        </div>
    )
}
