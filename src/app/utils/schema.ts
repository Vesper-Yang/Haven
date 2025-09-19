import { z } from "zod";
import { Mood } from "./moods";

export const entrySchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().optional(),
  journalDate: z.date({
    error: "A date is required",
  }),
  timeZone: z.string(),
  mood: z.string(),
  collectionId: z.string().optional().nullable(),
});

export type entrySchemaType = z.infer<typeof entrySchema>;

export const collectionSchema = z.object({
  name: z.string().min(1, "Name is required"),
});
export type collectionSchemaType = z.infer<typeof collectionSchema>;

export type CollectionWithEntriesType = {
  entries: {
    moodData: Mood | null;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    title: string | null;
    content: string | null;
    journalDate: Date;
    timeZone: string | null;
    mood: string | null;
    collectionId: string | null;
    userId: string;
  }[];
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
};

export type UpdateCollectionType = {
  id: string;
  name: string;
};

export type EntryWithCollectionType = {
  title: string | null;
  content: string | null;
  journalDate: Date;
  timeZone: string | null;
  mood: string | null;
  collectionId: string | null;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  collection: {
    name: string;
    id: string;
  } | null;
};
