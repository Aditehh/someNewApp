import React from 'react'
import { markNotificationAsReadAction } from '@/lib/actions/actions'
import { Button } from './button'

interface MarkAsReadButtonProps {
    notificationId: number
}

export default function MarkAsReadButton({ notificationId }: MarkAsReadButtonProps) {
    return (
        <form action={markNotificationAsReadAction}>
            <input type="hidden" name='notificationId' value={notificationId} />
            <Button type='submit' variant={'secondary'}>
                Mark as Read
            </Button>
        </form>
    )
}
