"use client";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import React from "react";
import ChatPanel from "./ChatPanel";

const page = ({
  params,
}: {
  params: {
    documentId: Id<"documents">;
  };
}) => {
  const document = useQuery(api.documents.getDocument, {
    documentId: params.documentId,
  });
  if (!document) return <div>You don't have access to view this document</div>;
  return (
    <div className="p-10 h-screen overflow-y-hidden">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold">{document.title}</h1>
      </div>
      <div className="flex gap-10 h-[400px]">
        <div className="bg-gray-800 p-4 rounded-lg flex-1">
          {document.documentUrl && (
            <iframe
              className="w-full h-full overflow-x-hidden"
              src={`${document.documentUrl}`}
            />
          )}
        </div>
        <ChatPanel documentId={document._id}/>
      </div>
    </div>
  );
};

export default page;
