"use client"
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateNoteForm from "./CreateNoteForm";
import {  Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const CreateNoteButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {toast} = useToast()

  return (
    <div>
      <Dialog onOpenChange={setIsOpen} open={isOpen}>
        <DialogTrigger asChild>
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Create Note
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a Note</DialogTitle>
            <DialogDescription>
              Type Whatever Note you to search over in the Future.
            </DialogDescription>
            <CreateNoteForm onNoteCreated={() => {
              setIsOpen(false)
              toast({
                title: "Note Created",
                description: "Your note has been created successfully",
              })}} />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateNoteButton;
