"use client";
import UploadDocumentButton from "@/components/UploadDocumentButton";
import DocumentCard from "@/components/DocumentCard";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import Image from "next/image";

export default function Home() {
  const documents = useQuery(api.documents.getDocuments);

  return (
    <main className="p-24">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold">My Documents</h1>
        <UploadDocumentButton />
      </div>
      {documents && documents.length === 0 && (
        <div className="flex flex-col justify-center items-center m-5 p-2 gap-2">
          <Image
            src="/image.svg"
            height={200}
            width={200}
            alt="Image of A girl holding document"
          />
          <h2 className="text-md font-semibold">You don't have any documents</h2>
          <UploadDocumentButton />
        </div>
      )}
      {!documents && (
        <div className="grid grid-cols-3 gap-8">
          {new Array(6).fill(0).map((_, index) => (
            <Card className="h-[190px] p-6 flex flex-col justify-between">
              <Skeleton className="h-[20px] rounded" />
              <Skeleton className="h-[20px] rounded" />
              <Skeleton className="h-[20px] rounded" />
              <Skeleton className="h-[40px] w-[80px] rounded-md" />
            </Card>
          ))}
        </div>
      )}
      
      {documents && documents.length > 0 && (
        <div className="grid grid-cols-3 gap-8">
          {documents?.map((doc) => {
            return <DocumentCard key={doc._id} document={doc} />;
          })}
        </div>
      )}
    </main>
  );
}
