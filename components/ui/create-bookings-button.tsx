import { createBookingsAction } from '@/lib/actions/actions'
import { Button } from './button'

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

                    <Button variant={'default'} className='cursor-pointer'>Book</Button>
                </div>
            </form>
        </div>
    )
}
