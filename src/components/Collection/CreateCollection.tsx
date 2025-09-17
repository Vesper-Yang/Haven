"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { collectionSchema, collectionSchemaType } from "@/app/utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { BarLoader } from "react-spinners";

interface CreateCollectionProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  isLoading: boolean;
  onSuccess: (newCollection: collectionSchemaType) => void;
}

const CreateCollection = ({
  open,
  setOpen,
  isLoading,
  onSuccess,
}: CreateCollectionProps) => {
  const form = useForm<collectionSchemaType>({
    resolver: zodResolver(collectionSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: collectionSchemaType) {
    onSuccess(values);
  }

  useEffect(() => {
    if (open) form.reset();
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Collection</DialogTitle>
          <DialogDescription className="sr-only">
            Enter a name for your new collection in the form below.
          </DialogDescription>
        </DialogHeader>
        {isLoading && <BarLoader color="orange" width={"100%"} />}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="type your collection" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCollection;
