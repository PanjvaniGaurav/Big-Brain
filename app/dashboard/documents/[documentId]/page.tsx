"use client";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import React from "react";
import ChatPanel from "./ChatPanel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import DeleteDocumentButton from "@/components/DeleteDocumentButton";

const Page = ({
  params,
}: {
  params: {
    documentId: Id<"documents">;
  };
}) => {
  const document = useQuery(api.documents.getDocument, {
    documentId: params.documentId,
  });

  return (
    <div className="flex flex-col w-full sm:h-full max-sm:h-[calc(100vh-150px)] lg:h-[calc(100vh-90px)] overflow-hidden">
      {!document && (
        <div className="p-4 flex flex-col gap-3">
          <Skeleton className="h-[50px] w-full rounded mb-3" />
          <Skeleton className="h-[40px] w-[200px] rounded" />
          <Skeleton className="h-[calc(100vh-200px)] w-full rounded-lg" />
        </div>
      )}
      {document && (
        <div className="flex flex-col h-full">
          <header className="p-4 flex justify-between items-center border-b">
            <h1 className="text-2xl font-bold dark:text-white truncate">{document.title}</h1>
            <DeleteDocumentButton documentId={document._id} />
          </header>
          <main className="flex-grow overflow-hidden p-4">
            <Tabs defaultValue="document" className="w-full h-full">
              <TabsList className="mb-4">
                <TabsTrigger className="max-sm:text-md" value="document">Document</TabsTrigger>
                <TabsTrigger className="max-sm:text-md" value="chat">Chat</TabsTrigger>
              </TabsList>
              <TabsContent value="document" className="max-sm:h-[calc(100vh-320px)] h-[calc(100vh-250px)]">
                <div className="dark:bg-gray-800 p-4 rounded-lg h-full overflow-auto">
                  {document.documentUrl && (
                    <iframe
                      className="w-full h-full"
                      src={document.documentUrl}
                    />
                  )}
                </div>
              </TabsContent>
              <TabsContent value="chat" className="h-[calc(100vh-200px)]">
                <ChatPanel documentId={document._id} />
              </TabsContent>
            </Tabs>
          </main>
        </div>
      )}
    </div>
  );
};

export default Page;