'use client'

import React from 'react'
import { useFormStatus } from 'react-dom'
import { Button } from './button';

export default function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type='submit' disabled={pending}>
            {pending ? "Booking..." : "Book"}
        </Button>
    )
}
