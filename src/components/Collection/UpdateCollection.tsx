"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  collectionSchema,
  collectionSchemaType,
  CollectionWithEntriesType,
} from "@/app/utils/schema";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import useFetch from "@/hooks/use-fetch";
import { UpdateCollection } from "@/actions/collection";
import { toast } from "sonner";
import { BarLoader } from "react-spinners";

interface UpdateCollectionProps {
  collection: CollectionWithEntriesType;
}

const UpdateCollectionDialog = ({ collection }: UpdateCollectionProps) => {
  const [open, setOpen] = useState(false);
  const {
    isLoading: isUpdatingCollection,
    execute: UpdateCollectionAction,
    data: updatedCollection,
  } = useFetch(UpdateCollection);

  const form = useForm<collectionSchemaType>({
    resolver: zodResolver(collectionSchema),
    defaultValues: {
      name: collection.name,
    },
  });

  async function onSubmit(values: collectionSchemaType) {
    UpdateCollectionAction({
      ...values,
      id: collection.id,
    });
  }

  useEffect(() => {
    if (!isUpdatingCollection && updatedCollection) {
      setOpen(false);
      toast.success(`Collection ${collection.id} updated successfully! 🎉`);
    }
  }, [isUpdatingCollection, updatedCollection, collection]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Collection</DialogTitle>
          <DialogDescription className="sr-only">
            DialogDescription
          </DialogDescription>
        </DialogHeader>
        {isUpdatingCollection && <BarLoader color="orange" width={"100%"} />}
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
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  disabled={isUpdatingCollection}
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isUpdatingCollection}>
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateCollectionDialog;
