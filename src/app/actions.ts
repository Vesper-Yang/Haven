"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function createEntry(formdata: FormData) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("You must be logged in to create an entry.");
  }

  const content = formdata.get("content")?.toString();
  if (!content) {
    throw new Error("Content is required.");
  }

  try {
    await prisma.entry.create({
      data: { content, userId },
    });
  } catch (error) {
    console.error("Failed to create entry:", error);
    throw new Error("Failed to save your entry. Please try again.");
  }

  revalidatePath("/");
}

export async function getEntries() {
  const { userId } = await auth();
  if (!userId) {
    return [];
  }

  const entries = await prisma.entry.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return entries;
}
