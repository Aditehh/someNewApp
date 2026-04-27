import React from 'react'
import { archiveServiceAction } from '@/lib/actions/actions'
import { Button } from './button'


interface ArchiveServiceButtonProps {
    serviceId: number;

}


export default function ArchiveServiceButton({ serviceId }: ArchiveServiceButtonProps) {
    return (
        <Button onClick={archiveServiceAction} variant={'default'} >
            archive service
        </Button>
    )
}
