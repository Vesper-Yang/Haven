import { z } from "zod";

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

export type Collection = {
  name: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
};
