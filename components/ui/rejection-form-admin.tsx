import React from 'react'
import { rejectProviderVerificationAction } from '@/lib/actions/actions'

export default function RejectionFormAdmin() {
    return (
        <div>
            <form action={rejectProviderVerificationAction}>
                <input type="hidden" name='providerProfileId'  />
                <input type="text" required name='rejectionReason' placeholder='whats the reason for the rejection?' />
                <button type='submit'>verify rejection reason</button>
            </form>
        </div>
    )
}
