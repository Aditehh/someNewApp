"use client";

import { useState } from "react";
import { Button } from "./button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "./dialog";
import { publishServiceAction } from "@/lib/actions/actions";
import { Rocket } from "lucide-react";

interface PublishServiceButtonProps {
  serviceId: number;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
}

export default function PublishServiceButton({
  serviceId,
  status,
}: PublishServiceButtonProps) {
  const [open, setOpen] = useState(false);

  // Only allow publishing if it's a draft
  if (status !== "DRAFT") return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          size="icon"
          className="rounded-lg bg-green-600 hover:bg-green-700"
        >
          <Rocket size={16} />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-green-600">
            Publish Service
          </DialogTitle>
          <DialogDescription>
            Once published, your service will become visible in the marketplace.
          </DialogDescription>
        </DialogHeader>

        <form
          action={async (formData: FormData) => {
            const id = Number(formData.get("serviceId"));
            if (!id) return;

            await publishServiceAction(id);
            setOpen(false);
          }}
        >
          <input type="hidden" name="serviceId" value={serviceId} />

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>

            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              Confirm Publish
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
