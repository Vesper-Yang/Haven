"use server";

import { getMoodById, MOODS } from "@/app/utils/moods";
import { entrySchemaType } from "@/app/utils/schema";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

export async function createEntry(data: entrySchemaType) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await prisma?.user.findUnique({
      where: {
        clerkUserId: userId,
      },
    });
    if (!user) throw new Error("User not found");

    const mood = MOODS[data.mood.toUpperCase()];
    if (!mood) throw new Error("Invalid mood");

    const entry = await prisma?.entry.create({
      data: {
        title: data.title,
        content: data.content,
        journalDate: data.journalDate,
        timeZone: data.timeZone,
        mood: mood.id,
        userId: user.id,
        collectionId: data.collectionId,
      },
    });

    revalidatePath("/home");
    return { success: true, data: entry };
  } catch (error) {
    return { success: false, error: error };
  }
}

export async function getEntries() {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await prisma.user.findUnique({
      where: {
        clerkUserId: userId,
      },
    });
    if (!user) throw new Error("User not found");

    const entries = await prisma.entry.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        journalDate: "desc",
      },
    });

    const entriesWithMoodData = entries.map((entry) => ({
      ...entry,
      moodData: entry.mood ? getMoodById(entry.mood) : null,
    }));

    return { success: true, data: entriesWithMoodData };
  } catch (error) {
    return { success: false, error: error };
  }
}
