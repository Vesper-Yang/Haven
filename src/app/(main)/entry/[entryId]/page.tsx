import { getEntryById } from "@/actions/entry";
import { getMoodById } from "@/app/utils/moods";
import { notFound } from "next/navigation";
import React from "react";
import { format } from "date-fns";
import Link from "next/link";
import DeleteCollecitonDialog from "@/components/Entry/DeleteEntryDialog";
import DeleteEntryDialog from "@/components/Entry/DeleteEntryDialog";

const EntryPage = async ({ params }: { params: { entryId: string } }) => {
  const { entryId } = await params;
  const entry = await getEntryById(entryId);

  if (!entry || !entry.data) {
    notFound();
  }
  const entryData = entry.data;
  const mood = entryData.mood ? getMoodById(entryData.mood) : null;
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-2">
        <div className="text-2xl">{entryData.title}</div>
        <DeleteEntryDialog entry={entryData} />
      </div>
      <div className="flex flex-row justify-between">
        {entryData.collection ? (
          <Link
            href={`/collection/${entryData.collectionId}`}
            className="border border-orange-500 rounded-2xl inline-flex p-2 bg-orange-50"
          >
            Collection:
            {entryData.collection.name}
          </Link>
        ) : (
          <div className="rounded-2xl inline-flex p-2 bg-gray-100">
            unorganized
          </div>
        )}
        <div>
          Created {format(new Date(entryData.journalDate), "yyyy/MM/dd HH:mm")}
        </div>
      </div>
      <div className="inline-flex flex-row gap-2 bg-orange-200 items-center justify-center p-2 rounded-sm">
        <span className="text-4xl">{mood?.emoji}</span>
        <span>{mood?.label} </span>
      </div>
      <div className="text-lg">{entryData.content}</div>
      <div className="text-sm text-gray-500 pt-4">
        Last updated {format(new Date(entryData.updatedAt), "PPP 'at' p")}
      </div>
    </div>
  );
};

export default EntryPage;
