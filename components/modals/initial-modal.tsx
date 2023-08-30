"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@radix-ui/react-dialog";
import { DialogFooter, DialogHeader } from "../ui/dialog";
import { useForm } from "react-hook-form";

const formShema = z.object({
  name: z.string().min(1, {
    message: "Server name is required.",
  }),
  imageUrl: z.string().min(1, {
    message: "ImageUrl is required",
  }),
});

export const InitialModal = () => {
  const form = useForm({
    resolver: zodResolver(formShema),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  return (
    <>
      <Dialog open>
        <DialogContent className="bg-white text-black p-0 overflow-hidden">
          <DialogHeader className="pt-8 px-6">
            <DialogTitle className="text-2xl text-center font-bold">
              Customize your serveer
            </DialogTitle>
            <DialogDescription className="text-center text-zinc-500">
              {" "}
              Give your server a personality whith a name and an image. You can
              always change it later
            </DialogDescription>
          </DialogHeader>

          <DialogFooter></DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
