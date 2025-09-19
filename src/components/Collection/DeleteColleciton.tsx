"use client";

import { CollectionWithEntriesType } from "@/app/utils/schema";
import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import useFetch from "@/hooks/use-fetch";
import { deleteCollection } from "@/actions/collection";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { BarLoader } from "react-spinners";

interface DeleteCollecitonProps {
  collection: CollectionWithEntriesType;
  entriesCount: number;
}

const DeleteCollecitonDialog = ({
  collection,
  entriesCount = 0,
}: DeleteCollecitonProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const {
    isLoading: isDeletingCollection,
    execute: DeleteCollecitonAction,
    data: deleteSuccess,
  } = useFetch(deleteCollection);

  const handleDelete = () => {
    DeleteCollecitonAction(collection.id);
  };

  useEffect(() => {
    if (deleteSuccess && !isDeletingCollection) {
      setOpen(false);
      toast.warning(`Collection ${collection.name} has been deleted 🎉`);
      router.push("/home");
    }
  }, [deleteSuccess, isDeletingCollection, collection, router]);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger>
        <Button variant="destructive">Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          {isDeletingCollection && <BarLoader color="orange" width={"100%"} />}
          <AlertDialogDescription>
            当前分类下有
            <span className="text-red-500">{entriesCount}</span>
            条日记。
            当您删除此Collection后,这些日记的分类CollectionI自动变为null,成为未分类。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeletingCollection}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeletingCollection}
          >
            {isDeletingCollection ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteCollecitonDialog;
