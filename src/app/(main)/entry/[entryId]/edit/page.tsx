import React from "react";

import { getEntryById } from "@/actions/entry";
import { notFound } from "next/navigation";
import UpdateEntryForm from "@/components/Entry/UpdateEntryForm";

const UpdateEntry = async ({ params }: { params: { entryId: string } }) => {
  const { entryId } = await params;
  const entry = await getEntryById(entryId);
  if (!entry || !entry.data) {
    notFound();
  }
  const entryData = entry.data;

  return (
    <div>
      <UpdateEntryForm initialEntry={entryData} />
    </div>
  );
};

export default UpdateEntry;
