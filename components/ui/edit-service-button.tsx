"use client"
import React, { useState } from 'react'
import { editServiceAction } from '@/lib/actions/actions'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from './button';
import { Label } from 'radix-ui';
import { Input } from './input';
import { Pencil } from 'lucide-react';


interface EditServiceProps {
    serviceId: number,
    title: string,
    description: string,
    price: number,
    categoryId: number
    duration: number
}

export default function EditServiceButton({ serviceId, title, description, price, duration, categoryId }: EditServiceProps) {

    const [open, setOpen] = useState(false)

    return (

        <>

            <Dialog open={open} onOpenChange={setOpen}>
                {/* Button to open dialog */}
                <DialogTrigger asChild>
                    <button
                        style={{
                            width: "36px",
                            height: "36px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "6px",
                            border: "1px solid #ccc",
                            background: "#f9fafb",
                            cursor: "pointer",
                        }}
                    >
                        <Pencil size={16} />

                    </button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-106.25">
                    <DialogHeader>
                        <DialogTitle>Edit Note</DialogTitle>
                        <DialogDescription>
                            Make changes to your note here. Click Save when done.
                        </DialogDescription>
                    </DialogHeader>

                    {/* Only one form, wrapping inputs and submit */}
                    <form
                        action={async (formData: FormData) => {
                            const title = formData.get("title") as string;
                            const content = formData.get("content") as string;

                            await editServiceAction(serviceId, title, description, price, duration, categoryId); // call server action
                            setOpen(false); // close dialog
                        }}
                    >
                        <input type="hidden" name="noteId" value={serviceId} />
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <label htmlFor="title">Title</label>
                                <Input id="title" name="title" defaultValue={title} required />
                            </div>
                            <div className="grid gap-2">
                                <label htmlFor="content">Content</label>
                                <Input id="content" name="content" defaultValue={description} required />
                            </div>
                        </div>

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Save</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>











        </>
    )
}
