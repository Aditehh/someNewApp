import { NextResponse } from 'next/server'
import React from 'react'

export async function POST() {
    const data = {
        message: "login register",
        timeStamp: new Date().toISOString(),
    }
    return NextResponse.json(data)
}
