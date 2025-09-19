"use client";

import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  collectionSchemaType,
  entrySchema,
  entrySchemaType,
} from "@/app/utils/schema";
import { MOODS } from "@/app/utils/moods";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { updateEntry } from "@/actions/entry";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { BarLoader } from "react-spinners";
import useFetch from "@/hooks/use-fetch";
import { createCollection, getCollections } from "@/actions/collection";
import { Check, ChevronsUpDown, Circle, Plus, Smile } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import CreateCollectionDialog from "@/components/Collection/CreateCollection";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { getMoodById } from "@/app/utils/moods";
import { EntryWithCollectionType } from "@/app/utils/schema";

interface UpdateEntryFormType {
  initialEntry: EntryWithCollectionType;
}
const UpdateEntryForm = ({ initialEntry }: UpdateEntryFormType) => {
  const initialEntryMood = initialEntry.mood
    ? getMoodById(initialEntry.mood)
    : null;

  const router = useRouter();
  const [collectionOpen, setcollectionOpen] = useState(false);
  const [createCollectionpen, setCreateCollectionOpen] = useState(false);

  const {
    isLoading: isFetchingCollections,
    execute: fetchCollections,
    data: collections,
  } = useFetch(getCollections);
  const collectionList = collections?.data || [];

  const {
    isLoading: isUpdatingEntry,
    execute: updateEntryAction,
    data: updatedEntry,
  } = useFetch(updateEntry);

  const {
    isLoading: isCreatingCollection,
    execute: createCollectionAction,
    data: createdCollection,
  } = useFetch(createCollection);

  const form = useForm<entrySchemaType>({
    resolver: zodResolver(entrySchema),
    defaultValues: {
      title: initialEntry.title || "未命名",
      content: initialEntry.content || undefined,
      journalDate: new Date(initialEntry.journalDate),
      timeZone:
        initialEntry.timeZone ||
        Intl.DateTimeFormat().resolvedOptions().timeZone,
      mood: initialEntryMood?.id || MOODS.OK.id,
      collectionId: initialEntry.collectionId || null,
    },
  });

  async function onSubmit(values: entrySchemaType) {
    console.log("点击提交时,Entry的数据:", values);
    updateEntryAction({
      ...values,
      id: initialEntry.id,
    });
  }

  useEffect(() => {
    if (updatedEntry && !isUpdatingEntry) {
      toast.success(
        `Entry ${updatedEntry.data?.title} updated successfully! 🎊`
      );
      router.push("/home");
    }
  }, [updatedEntry, isUpdatingEntry, router]);

  useEffect(() => {
    fetchCollections();
  }, [fetchCollections]);

  useEffect(() => {
    if (createdCollection && !isCreatingCollection) {
      setCreateCollectionOpen(false);
      fetchCollections();
      form.setValue("collectionId", createdCollection.data?.id);
      toast.success(
        `Collection ${createdCollection.data?.id} created successfully! 🎉`
      );
    }
  }, [createdCollection, isCreatingCollection, fetchCollections, form]);

  const handleCreateCollection = (data: collectionSchemaType) => {
    createCollectionAction(data);
  };

  const isLoading =
    isUpdatingEntry || isCreatingCollection || isFetchingCollections;

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {isLoading && <BarLoader color="orange" width={"100%"} />}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Give your entry a title..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mood"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>How are you feeling?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-row gap-4"
                  >
                    {Object.values(MOODS).map((mood) => (
                      <FormItem
                        key={mood.id}
                        className="flex items-center gap-2 border rounded-sm p-2 cursor-pointer"
                      >
                        <FormControl>
                          <RadioGroupItem value={mood.id} />
                        </FormControl>
                        <FormLabel className="font-normal">
                          <span>{mood.emoji}</span>
                          <span>{mood.label}</span>
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="journalDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date of birth</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      captionLayout="dropdown"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="collectionId"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Add to collection</FormLabel>
                <Popover open={collectionOpen} onOpenChange={setcollectionOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={collectionOpen}
                        className={cn(
                          "w-[400px] justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? collectionList.find(
                              (collection) => collection.id === field.value
                            )?.name
                          : "Select a collection"}
                        <ChevronsUpDown className="opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[400px] p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search collection..."
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>No collection found.</CommandEmpty>
                        <CommandGroup>
                          <CommandItem
                            value="--clear-selection"
                            key="--clear-selection"
                            onSelect={() => {
                              form.setValue("collectionId", null);
                              setcollectionOpen(false);
                            }}
                          >
                            <Circle />
                            <span>No collection</span>
                          </CommandItem>
                          {collectionList.map((collection) => (
                            <CommandItem
                              value={collection.name}
                              key={collection.id}
                              onSelect={() => {
                                form.setValue("collectionId", collection.id);
                                setcollectionOpen(false);
                              }}
                            >
                              <Smile />
                              {collection.name}
                              <Check
                                className={cn(
                                  "ml-auto",
                                  collection.id === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                        <CommandGroup heading="New collection">
                          <CommandItem
                            value="new"
                            key="new"
                            onSelect={() => {
                              setCreateCollectionOpen(true);
                            }}
                          >
                            <Plus />
                            Create a new collection
                          </CommandItem>
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Tel a little bit about yourself"
                    className="resize-none min-h-40"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isUpdatingEntry}>
            Update
          </Button>
        </form>
      </Form>

      <CreateCollectionDialog
        open={createCollectionpen}
        setOpen={setCreateCollectionOpen}
        isLoading={isCreatingCollection}
        onSuccess={handleCreateCollection}
      />
    </div>
  );
};

export default UpdateEntryForm;
