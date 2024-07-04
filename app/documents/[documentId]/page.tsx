"use client";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import React from "react";
import ChatPanel from "./ChatPanel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  if (!document) return <div>You don't have access to view this document</div>;

  return (
    <div className="flex flex-col h-screen overflow-hidden mb-6">
      <header className="bg-gray-900 p-4">
        <h1 className="text-2xl font-bold text-white">{document.title}</h1>
      </header>
      <main className="flex-grow flex flex-col overflow-hidden p-4">
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
    </div>
  );
};

export default Page;
