"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getMoodById } from "@/app/utils/moods";
import { EntryWithCollectionType } from "@/app/utils/schema";
import { format } from "date-fns";

const EntryCard = ({ entry }: { entry: EntryWithCollectionType }) => {
  const mood = entry.mood ? getMoodById(entry.mood) : null;

  return (
    <div>
      <Card className="w-full max-w-lg hover:border-brand group">
        <CardHeader>
          <CardTitle>
            <div className="flex flex-row gap-1 items-center">
              <div className="text-xl">{mood?.emoji}</div>
              <div className="group-hover:text-brand ">{entry.title}</div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-gray-600">{entry.content} </div>
        </CardContent>
        <CardFooter className="flex flex-row justify-between items-center">
          <p className="w-fit text-xs py-1 px-2 rounded-sm border-brand bg-brand/10 text-brand">
            {entry.collection ? entry.collection.name : "unorganized"}
          </p>
          <p className="text-xs text-gray-500">
            {format(new Date(entry.journalDate), "PPP p")}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default EntryCard;
