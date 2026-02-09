import React from 'react'
import { approveProviderVerificationAction } from '@/lib/actions/actions'
import { Button } from './button'

export default function ApproveVerificationButton({ providerProfileId }: { providerProfileId: number }) {
    const handleclick = async () => {
        await approveProviderVerificationAction(providerProfileId);
    }
    return (
        <div>
            <Button variant={'outline'} onClick={() => handleclick}>
                Approve
            </Button>
        </div>
    )
}
