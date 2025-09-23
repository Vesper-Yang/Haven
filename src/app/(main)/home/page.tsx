import { getCollections } from "@/actions/collection";
import { getEntries } from "@/actions/entry";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

const Home = async () => {
  const collections = (await getCollections()).data;
  const entries = (await getEntries()).data;

  return (
    <div>
      <Link href={"/entry/new"}>
        <RainbowButton variant={"outline"} className="text-[#0751cf]">
          <Plus />
          <span>Imprint</span>
        </RainbowButton>
      </Link>
      <div>This is collection list</div>
      <div className="grid grid-cols-4 gap-1">
        {collections?.map((collection) => (
          <Link
            key={collection.id}
            href={`/collection/${collection.id}`}
            className="border border-orange-300 rounded-sm p-2 w-full"
          >
            {collection.name}
          </Link>
        ))}
      </div>
      <div className="text-2xl font-medium">The River of Time</div>
      <div className="flex flex-col gap-2">
        {entries?.map((entry) => (
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
              {entry.collection ? entry.collection.name : "unorganized"}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
