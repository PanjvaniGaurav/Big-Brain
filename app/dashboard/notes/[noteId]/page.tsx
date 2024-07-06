"use client";
import React from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import DeleteNoteButton from "../DeleteNoteButton";
import { Separator } from "@/components/ui/separator";

const Page = () => {
  const { noteId } = useParams<{ noteId: Id<"notes"> }>();
  const note = useQuery(api.notes.getNote, { noteId });

  if (!note) {
    return null;
  }

  return (
    <div className="bg-slate-700 w-full p-4 min-h-[400px] text-lg rounded-md">
      <div className="sticky top-0 bg-slate-700 z-10">
        <div className="flex justify-between">
          <h2 className="text-xl font-bold italic mb-2 mt-1">{note.title}</h2>
          <DeleteNoteButton noteId={noteId} />
        </div>
        <Separator className="my-1" />
      </div>
      <div className="mt-2 max-h-[calc(100vh-310px)] overflow-auto whitespace-pre-line">
        {note.text}
      </div>
    </div>
  );
};

export default Page;
