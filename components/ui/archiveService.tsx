"use client"
import React from 'react'
import { archiveServiceAction } from '@/lib/actions/actions'
import { Button } from './button'


interface ArchiveServiceButtonProps {
    serviceId: number;

}


export default function ArchiveServiceButton({ serviceId }: ArchiveServiceButtonProps) {
    return (
        <form action={async (formdata: FormData) => {
            const id = Number(formdata.get("serviceId"));
            if (!id) return;

            await archiveServiceAction(id);

        }}>
            <input type="hidden" name="serviceId" value={serviceId} />
            <Button type='submit'>
                Archive
            </Button>

        </form>
    )
}
