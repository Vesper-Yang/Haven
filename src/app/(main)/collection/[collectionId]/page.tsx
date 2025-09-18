import { getCollectionById } from "@/actions/collection";
import { CollectionWithEntriesType } from "@/app/utils/schema";
import UpdateCollectionDialog from "@/components/Collection/UpdateCollection";
import React from "react";

const CollectionPage = async ({
  params,
}: {
  params: { collectionId: string };
}) => {
  const { collectionId } = await params;
  const collection = await getCollectionById(collectionId);
  const collectionData = collection.data as CollectionWithEntriesType;
  const entries = collectionData?.entries;

  return (
    <div>
      <div>
        <div className="flex flex-row gap-2">
          <div className="text-2xl font-bold">{collection.data?.name}</div>
          <UpdateCollectionDialog collection={collectionData} />
        </div>
        <div>{collectionId}</div>
        <div className="flex flex-col gap-2">
          {entries && entries.length > 0
            ? entries.map((entry) => (
                <div
                  key={entry.id}
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
                </div>
              ))
            : "此日记本里为空"}
        </div>
      </div>
    </div>
  );
};

export default CollectionPage;
