import React from 'react'
import { Input } from './input'

export default function ProviderVerificationForm() {
  return (
    <div>
      <form action="">
        <Input name='documentType'/>
        <input type="file" name='document' />
      </form>
    </div>
  )
}
