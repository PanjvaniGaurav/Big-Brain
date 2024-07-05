"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { TrashIcon } from "lucide-react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import LoadingButton from "@/components/LoadingButton";

const DeleteNoteButton = ({ noteId }: { noteId: Id<"notes"> }) => {
  const [isLoading, setIsLoading] = useState(false);
  const deleteNode = useMutation(api.notes.deleteNote);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  return (
    <div className="relative">
      <AlertDialog open={isOpen} onOpenChange={(open) => setIsOpen(open)} >
        <AlertDialogTrigger asChild>
          <Button
            size="icon"
            variant="destructive"
            className="absolute -top-2 right-0"
          >
            <TrashIcon /> 
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this Note?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This note can not be recovered once deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>
              <LoadingButton
                onClick={() => {
                  setIsLoading(true);
                  deleteNode({
                    noteId,
                  })
                    .then(() => {
                      router.push("/dashboard/notes");
                    })
                    .finally(() => {
                      setIsLoading(false);
                    });
                }}
                isLoading={isLoading}
                loadingText="Deleting..."
              >
                Delete
              </LoadingButton>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DeleteNoteButton;
