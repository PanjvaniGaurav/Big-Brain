"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import UploadDocumentButton from "@/components/UploadDocumentButton";
import DocumentCard from "@/components/DocumentCard";
import { useOrganization } from "@clerk/nextjs";

export default function Home() {
  const organization = useOrganization()
  const documents = useQuery(api.documents.getDocuments, {
    orgId: organization.organization?.id
  });

  return (
    <div className="w-full space-y-8 max-sm:mt-4 sm:pt-2 lg:p-4 xl:p-6 overflow-hidden">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl md:text-4xl font-bold">My Documents</h1>
        <UploadDocumentButton />
      </div>

      {!documents && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-8">
          {new Array(6).fill("").map((_, i) => (
            <Card key={i} className="h-[200px] p-6 flex flex-col justify-between">
              <Skeleton className="h-[20px] rounded" />
              <Skeleton className="h-[20px] rounded" />
              <Skeleton className="h-[20px] rounded" />
              <Skeleton className="w-[80px] h-[40px] rounded" />
            </Card>
          ))}
        </div>
      )}

      {documents && documents.length === 0 && (
        <div className="py-12 flex flex-col justify-center items-center gap-8">
          <Image
            src="/image.svg"
            width="200"
            height="200"
            alt="a picture of a girl holding documents"
          />
          <h2 className="text-xl sm:text-2xl text-center">You have no documents</h2>
          <UploadDocumentButton />
        </div>
      )}

      {documents && documents.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-8">
          {documents?.map((doc) => <DocumentCard key={doc._id} document={doc} />)}
        </div>
      )}
    </div>
  );
}
