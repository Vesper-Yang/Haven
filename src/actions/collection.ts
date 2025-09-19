"use server";

import { getMoodById } from "@/app/utils/moods";
import { collectionSchemaType, UpdateCollectionType } from "@/app/utils/schema";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function createCollection(data: collectionSchemaType) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await prisma.user.findUnique({
      where: {
        clerkUserId: userId,
      },
    });
    if (!user) throw new Error("User not found");

    const collection = await prisma?.collection.create({
      data: { name: data.name, userId: user.id },
    });

    return { success: true, data: collection };
  } catch (error) {
    return { success: false, error: error };
  }
}

export async function getCollections() {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await prisma.user.findUnique({
      where: {
        clerkUserId: userId,
      },
    });
    if (!user) throw new Error("User not found");

    const collections = await prisma?.collection.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return { success: true, data: collections };
  } catch (error) {
    return { success: false, error: error };
  }
}

export async function getCollectionById(collectionId: string) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await prisma.user.findUnique({
      where: {
        clerkUserId: userId,
      },
    });
    if (!user) throw new Error("User not found");

    const collection = await prisma?.collection.findUnique({
      where: {
        id: collectionId,
        userId: user.id,
      },
      include: {
        entries: {
          orderBy: { journalDate: "desc" },
        },
      },
    });

    if (!collection) {
      return { success: false, error: "Collection not found" };
    }

    const entriesWithMoodData = collection.entries.map((entry) => ({
      ...entry,
      moodData: entry.mood ? getMoodById(entry.mood) : null,
    }));

    const finalCollection = {
      ...collection,
      entries: entriesWithMoodData,
    };
    return { success: true, data: finalCollection };
  } catch (error) {
    return { success: false, error: error };
  }
}

export async function updateCollection(data: UpdateCollectionType) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await prisma.user.findUnique({
      where: {
        clerkUserId: userId,
      },
    });
    if (!user) throw new Error("User not found");

    const existingCollection = await prisma.collection.findUnique({
      where: {
        id: data.id,
        userId: user.id,
      },
    });
    if (!existingCollection) throw new Error("Collection not found");

    const updatedCollection = await prisma.collection.update({
      where: {
        id: data.id,
        userId: user.id,
      },
      data: {
        id: data.id,
        name: data.name,
      },
    });

    revalidatePath(`/collection/${data.id}`);
    revalidatePath(`/home`);

    return { success: true, data: updatedCollection };
  } catch (error) {
    return { success: false, error: error };
  }
}

export async function deleteCollection(collectionId: string) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await prisma.user.findUnique({
      where: {
        clerkUserId: userId,
      },
    });
    if (!user) throw new Error("User not found");

    const existingCollection = await prisma.collection.findUnique({
      where: {
        id: collectionId,
        userId: user.id,
      },
    });
    if (!existingCollection) throw new Error("Collection not found");

    await prisma.collection.delete({
      where: {
        id: collectionId,
      },
    });

    revalidatePath(`/home`);
    revalidatePath(`/collection/${collectionId}`);

    return { success: true };
  } catch (error) {
    return { success: false, error: error };
  }
}
