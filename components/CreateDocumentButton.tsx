import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import UploadDocumentForm from "./UploadDocumentForm";

const CreateDocumentButton = () => {
    const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Dialog onOpenChange={setIsOpen} open={isOpen}>
        <DialogTrigger asChild>
          <Button>Upload Document</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload a document</DialogTitle>
            <DialogDescription>
              Upload a team document for you to search over in the Future.
            </DialogDescription>
            <UploadDocumentForm onUpload = {() => setIsOpen(false)}/>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateDocumentButton;
