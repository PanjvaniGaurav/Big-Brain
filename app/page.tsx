"use client";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import {
  Authenticated,
  Unauthenticated,
  useMutation,
  useQuery,
} from "convex/react";

export default function Home() {
  const documents = useQuery(api.documents.getDocuments);
  const createDocument = useMutation(api.documents.createDocument);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button
        onClick={() => {
          createDocument({ title: "Hello world" });
        }}
      >
        click me
      </Button>

      {documents?.map((doc) => {
        return <div key={doc._id}>{doc.title}</div>;
      })}
    </main>
  );
}
