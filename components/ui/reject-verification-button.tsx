import React from 'react'
import { rejectProviderVerificationAction } from '@/lib/actions/actions'
import { Button } from './button'

export default function RejectProviderVerificationButton() {
  const handleClick = async () => {
    // await rejectProviderVerificationAction()
  }

  return (
    <div>
      <Button
        onClick={handleClick}
        variant="destructive"
      >
        Reject
      </Button>
    </div>
  )
}
