import { getCollectionById } from "@/actions/collection";
import { CollectionWithEntriesType } from "@/app/utils/schema";
import DeleteCollecitonDialog from "@/components/Collection/DeleteColleciton";
import UpdateCollectionDialog from "@/components/Collection/UpdateCollection";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

const CollectionPage = async ({
  params,
}: {
  params: { collectionId: string };
}) => {
  const { collectionId } = await params;
  const collection = await getCollectionById(collectionId);
  if (!collection || !collection.data) {
    notFound();
  }
  const collectionData = collection.data as CollectionWithEntriesType;
  const entries = collectionData.entries;

  return (
    <div>
      <div>
        <div className="flex flex-row gap-2">
          <div className="text-2xl font-bold">{collection.data?.name}</div>
          <UpdateCollectionDialog collection={collectionData} />
        </div>
        <DeleteCollecitonDialog
          collection={collectionData}
          entriesCount={entries.length}
        />
        <div>{collectionId}</div>
        <div className="flex flex-col gap-2">
          {entries && entries.length > 0
            ? entries.map((entry) => (
                <Link
                  key={entry.id}
                  href={`/entry/${entry.id}`}
                  className="flex flex-col border border-amber-500 rounded-2xl p-2"
                >
                  <div>日记标题: {entry.title}</div>
                  <div>日记正文:{entry.content} </div>
                  <div>
                    心情:
                    <span>{entry.moodData?.emoji}</span>
                    <span>{entry.moodData?.label}</span>
                  </div>
                  <div>
                    日记本:
                    {collectionData.name}
                  </div>
                </Link>
              ))
            : "此日记本里为空"}
        </div>
      </div>
    </div>
  );
};

export default CollectionPage;
