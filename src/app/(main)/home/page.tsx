import { getEntries } from "@/actions/entry";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Home = async () => {
  const entries = (await getEntries()).data;

  return (
    <div>
      <Link href={"/entry/new"}>
        <Button className="rounded-lg">Write new Journal</Button>
      </Link>
      <div>This is Timeline.</div>
      <div className="flex flex-col gap-2">
        {entries?.map((entry) => {
          return (
            <div
              key={entry.id}
              className="flex flex-col border border-amber-500 rounded-2xl p-2"
            >
              <div>{entry.title}</div>
              <div>{entry.content} </div>
              <div>{entry.moodData?.emoji} </div>
              <div>{entry.moodData?.label} </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
