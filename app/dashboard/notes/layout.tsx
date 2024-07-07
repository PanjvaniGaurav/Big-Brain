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
import { Skeleton } from "@/components/ui/skeleton";
import { useOrganization } from "@clerk/nextjs";

const NotesLayout = ({ children }: { children: ReactNode }) => {
  const organization = useOrganization();
  const orgId = organization.organization?.id;
  const notes = useQuery(api.notes.getNotes,{orgId});
  const { noteId } = useParams<{ noteId: Id<"notes"> }>();
  return (
    <main className="w-full space-y-8 p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Notes</h1>
        <CreateNoteButton />
      </div>

      {!notes && (
        <div className="flex gap-20">
          <div className="w-[200px] space-y-4">
            <Skeleton className="h-[20px] w-full" />
            <Skeleton className="h-[20px] w-full" />
            <Skeleton className="h-[20px] w-full" />
            <Skeleton className="h-[20px] w-full" />
            <Skeleton className="h-[20px] w-full" />
            <Skeleton className="h-[20px] w-full" />
          </div>

          <div className="flex-1">
            <Skeleton className="h-[400px] w-full" />
          </div>
        </div>
      )}

      {notes?.length === 0 && (
        <div className="flex p-20 flex-col justify-center gap-3 items-center">
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

      {notes && notes.length > 0 && (
        <div className="flex gap-20 ">
          <ul className="space-y-2 w-[20%]">
            {notes?.map((note) => (
              <li
                key={note._id}
                className={cn("text-bold hover:text-stone-400 dark:hover:text-slate-300", {
                  "dark:text-blue-200 text-blue-500": note._id === noteId,
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
      )}
    </main>
  );
};

export default NotesLayout;
