"use client"
import { Input } from './input'
import { Button } from './button'
import { submitVerificationRequestAction } from '@/lib/actions/actions'
import { useState } from 'react'


export default function ProviderVerificationForm() {





  return (
    <div>
      <form action={submitVerificationRequestAction}>
        <select name="documentType" required>
          <option value="">Select your document Type</option>
          <option value="CITIZENSHIP">Citizenship</option>
          <option value="NATIONAL_ID">National Id</option>
          <option value="PASSPORT">Passport </option>
        </select>
        <Input type="text" name='documentNumber' required placeholder='Enter your respective documents id' />

        <Button >
          Submit Request
        </Button>

      </form>
    </div>
  )
}
