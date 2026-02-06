"use client"
import { Input } from './input'
import { Button } from './button'
import { submitVerificationRequestAction } from '@/lib/actions/actions'
import { useState } from 'react'


export default function ProviderVerificationForm() {

  const [submitted, setSubmitted] = useState(false)

  async function handlesubmit(formData: FormData) {
    await submitVerificationRequestAction(formData)
    setSubmitted(true)

  }

  if (submitted) {
    return (
      <>
        <h2 className="text-lg font-semibold text-amber-800">
          Verification in progress
        </h2>
        <p>
          Request submitted
        </p>
      </>
    )
  }


  return (
    <div>
      <form action={handlesubmit}>
        <select name="documentType" required>
          <option value="">Select your document Type</option>
          <option value="CITIZENSHIP">Citizenship</option>
          <option value="NID">National Id</option>
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
