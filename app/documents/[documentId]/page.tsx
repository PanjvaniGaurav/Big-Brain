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
    <div className="flex flex-col h-screen overflow-hidden mb-6">
      {!document && (
        <div className="p-4 flex flex-col gap-3 ">
          <div>
            <Skeleton className="h-[50px] w-full rounded mb-3" />
          </div>
          <div className="flex gap-2 ml-4">
            <Skeleton className="h-[40px] w-[100px] rounded" />
            <Skeleton className="h-[40px] w-[100px] rounded" />
          </div>
          <div className="ml-4">
            <Skeleton className="h-[500px] w-full rounded-lg" />
          </div>
        </div>
      )}
      {document && (
        <>
          <header className="bg-gray-900 p-4 pl-8 pt-5 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-white">{document.title}</h1>
            <DeleteDocumentButton documentId={document._id}/>
          </header>
          <main className="flex-grow flex flex-col overflow-hidden p-6 ml-4">
            <Tabs defaultValue="document" className="w-full h-full">
              <TabsList>
                <TabsTrigger value="document">Document</TabsTrigger>
                <TabsTrigger value="chat">Chat</TabsTrigger>
              </TabsList>
              <TabsContent value="document" className="h-full overflow-hidden">
                <div className="bg-gray-800 p-4 rounded-lg h-full">
                  {document.documentUrl && (
                    <iframe
                      className="w-full h-full"
                      src={document.documentUrl}
                    />
                  )}
                </div>
              </TabsContent>
              <TabsContent value="chat" className="h-full overflow-hidden">
                <ChatPanel documentId={document._id} />
              </TabsContent>
            </Tabs>
          </main>
        </>
      )}
    </div>
  );
};

export default Page;
