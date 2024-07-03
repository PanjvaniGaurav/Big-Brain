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
import { Upload } from "lucide-react";

const UploadDocumentButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Dialog onOpenChange={setIsOpen} open={isOpen}>
        <DialogTrigger asChild>
          <Button className="flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Upload Document
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload a document</DialogTitle>
            <DialogDescription>
              Upload a team document for you to search over in the Future.
            </DialogDescription>
            <UploadDocumentForm onUpload={() => setIsOpen(false)} />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UploadDocumentButton;
