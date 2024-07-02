"use client";
import CreateDocumentButton from "@/components/CreateDocumentButton";
import DocumentCard from "@/components/DocumentCard";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

export default function Home() {
  const documents = useQuery(api.documents.getDocuments);

  return (
    <main className="p-24">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold">My Documents</h1>
        <CreateDocumentButton />
      </div>
      <div className="grid grid-cols-4 gap-8">
        {documents?.map((doc) => {
          return <DocumentCard key={doc._id} document={doc} />;
        })}
      </div>
    </main>
  );
}
