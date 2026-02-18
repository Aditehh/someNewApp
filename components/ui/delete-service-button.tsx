"use client";

import { Button } from "./button";
import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { holdDeleteServiceAction } from "@/lib/actions/actions";
import { Trash2 } from "lucide-react";

interface DeleteButtonProps {
  serviceId: number;
}

export default function DeleteServiceButton({ serviceId }: DeleteButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="destructive"
          size="icon"
          className="rounded-lg"
        >
          <Trash2 size={16} />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-red-600">
            Delete Service
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently remove your service.
          </DialogDescription>
        </DialogHeader>

        <form
          action={async (formData: FormData) => {
            const id = Number(formData.get("serviceId"));
            if (!id) return;

            await holdDeleteServiceAction(id);
            setOpen(false);
          }}
        >
          <input type="hidden" name="serviceId" value={serviceId} />

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>

            <Button type="submit" variant="destructive">
              Confirm Delete
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
