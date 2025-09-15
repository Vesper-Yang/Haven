"use client";

import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { entrySchema, entrySchemaType } from "@/app/utils/schema";
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
import { createEntry } from "@/actions/entry";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { BarLoader } from "react-spinners";
import useFetch from "@/hooks/use-fetch";

const Entry = () => {
  const router = useRouter();
  const {
    isLoading: isCreatingEntry,
    execute: createEntryAction,
    data: newEntry,
  } = useFetch(createEntry);

  const form = useForm<entrySchemaType>({
    resolver: zodResolver(entrySchema),
    defaultValues: {
      title: "未命名",
      content: "",
      journalDate: new Date(),
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      mood: MOODS.OK.id,
      collectionId: null,
    },
  });

  async function onSubmit(values: entrySchemaType) {
    console.log("点击提交时,Entry的数据:", values);
    createEntryAction(values);
  }

  useEffect(() => {
    if (newEntry && !isCreatingEntry) {
      toast.success("Entry created successfully! 🎊");
      router.push("/home");
    }
  }, [newEntry, isCreatingEntry]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {isCreatingEntry && <BarLoader color="orange" width={"100%"} />}
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
                  {Object.values(MOODS).map((mood) => {
                    return (
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
                    );
                  })}
                </RadioGroup>
              </FormControl>
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default Entry;
