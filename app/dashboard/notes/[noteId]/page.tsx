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
    <div className="dark:bg-slate-700 border w-full p-2 sm:p-4 sm:max-h-[calc(100vh-500px)] max-sm:min-h-[calc(100vh-360px)] min-h-[calc(100vh-190px)] text-base sm:text-lg rounded-md">
      <div className="sticky top-0 dark:bg-slate-700">
        <div className="flex sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
          <h2 className="text-lg sm:text-xl font-bold italic mb-2 mt-1">{note.title}</h2>
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
