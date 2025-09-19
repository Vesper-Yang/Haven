"use client";

import { EntryWithCollectionType } from "@/app/utils/schema";
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
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { deleteEntry } from "@/actions/entry";

interface DeleteEntryDialogType {
  entry: EntryWithCollectionType;
}

const DeleteEntryDialog = ({ entry }: DeleteEntryDialogType) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const {
    isLoading: isDeletingEntry,
    execute: DeleteEntryAction,
    data: deleteSuccess,
  } = useFetch(deleteEntry);

  const handleDelete = () => {
    DeleteEntryAction(entry.id);
  };

  useEffect(() => {
    if (deleteSuccess && !isDeletingEntry) {
      setOpen(false);
      toast.warning(`Entry ${entry.title} has been deleted 🎉`);
      router.push("/home");
    }
  }, [deleteSuccess, isDeletingEntry, entry.title, router]);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger>
        <Button variant="destructive">Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            您确定要删除这条日记吗？当您删除后无法恢复哦。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeletingEntry}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={isDeletingEntry}>
            {isDeletingEntry ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteEntryDialog;
