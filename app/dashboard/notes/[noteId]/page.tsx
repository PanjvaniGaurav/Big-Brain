"use client";
import React from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import DeleteNoteButton from "../DeleteNoteButton";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

const page = () => {
  const { noteId } = useParams<{ noteId: Id<"notes"> }>();
  const note = useQuery(api.notes.getNote, { noteId });
  return (
    <div className="bg-slate-700 w-full p-4 min-h-[400px] text-lg rounded-md">
      {!note && (
        <div>
          <div className="flex justify-between">
            <Skeleton className="h-[30px] w-[50%] rounded-md mb-3" />
            <Skeleton className="h-[30px] w-[4%] rounded-md mb-3" />
          </div>
          <Separator className="space-y-2"/>
          <Skeleton className="h-[320px] w-full rounded-md mb-3 mt-2" />
        </div>
      )}
      {note && (
        <div>
          <div className="flex justify-between">
            <h2 className="text-xl font-bold italic mb-2 mt-1">{note?.title}</h2>
            <DeleteNoteButton noteId={noteId} />
          </div>
          <Separator className="my-1"/>
          <div className="mt-2 whitespace-pre-line">{note?.text}</div>
        </div>
      )}
    </div>
  );
};

export default page;
