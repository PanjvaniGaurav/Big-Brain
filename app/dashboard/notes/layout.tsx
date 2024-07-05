"use client";
import CreateNoteButton from "./CreateNoteButton";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import { ReactNode } from "react";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import Image from "next/image";

const NotesLayout = ({ children }: { children: ReactNode }) => {
  const notes = useQuery(api.notes.getNotes);
  const { noteId } = useParams<{ noteId: Id<"notes"> }>();
  return (
    <main className="w-full space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Notes</h1>
        <CreateNoteButton />
      </div>

      {notes?.length === 0 && (
        <div className="flex flex-col justify-center items-center">
          <Image
            src="/image.svg"
            width="200"
            height="200"
            alt="a picture of a girl holding documents"
          />
          <h2 className="text-2xl">You have no Notes</h2>
          <CreateNoteButton />
        </div>
      )}
      <div className="flex gap-20 ">
        <ul className="space-y-2 w-[20%]">
          {notes?.map((note) => (
            <li
              key={note._id}
              className={cn("text-bold hover:text-slate-300", {
                "text-blue-200": note._id === noteId,
              })}
            >
              <Link href={`/dashboard/notes/${note._id}`}>
                {note.title.substring(0, 20) + "..."}
              </Link>
            </li>
          ))}
        </ul>
        <div className="w-full">{children}</div>
      </div>
    </main>
  );
};

export default NotesLayout;
