import { getCollections } from "@/actions/collection";
import { getEntries } from "@/actions/entry";
import EntryCard from "@/components/Entry/EntryCard";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

const Home = async () => {
  const collections = (await getCollections()).data;
  const entries = (await getEntries()).data;

  return (
    <div className="px-4">
      <Link href={"/entry/new"} className="flex justify-center mb-2">
        <RainbowButton variant={"outline"} className="text-brand">
          <Plus />
          <span>Imprint</span>
        </RainbowButton>
      </Link>
      <div className="flex flex-col items-center justify-center">
        <div className="text-2xl font-medium my-4">Collection list</div>
        <div className="flex flex-wrap justify-center gap-2">
          {collections?.map((collection) => (
            <Link key={collection.id} href={`/collection/${collection.id}`}>
              <Button
                variant={"outline"}
                className="hover:border-brand border hover:bg-brand/10"
              >
                {collection.name}
              </Button>
            </Link>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="text-2xl font-medium my-4">The River of Time</div>
        <div className="flex flex-col gap-2">
          {entries?.map((entry) => (
            <Link
              key={entry.id}
              href={`/entry/${entry.id}`}
              className="max-w-lg"
            >
              <EntryCard entry={entry} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
