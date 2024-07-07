"use client";

import { useEffect, useState } from "react";
import { SearchForm } from "./SearchForm";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import { FileIcon, NotebookText } from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";

function SearchResult({
  key,
  link,
  type,
  score,
  text,
}: {
  key:Id<"documents"|"notes">;
  link: string;
  score: number;
  text: string;
  type: string;
}) {
  return (
    <Link href={link} key={key}>
      <li className="dark:hover:bg-slate-700 hover:bg-slate-300 bg-slate-200 dark:bg-slate-800 rounded p-4 whitespace-pre-line">
        <div className="flex justify-between mb-2">
          <div className="text-xl font-medium italic">
            {type === "notes" ? (
              <div className="flex gap-1">
                <NotebookText />
                Note
              </div>
            ) : (
              <div className="flex gap-1">
                <FileIcon />
                Document
              </div>
            )}
          </div>
          <div className="text-sm dark:font-thin">Relevancy: {score.toFixed(2)}</div>
        </div>
        <div className="text-lg">{text.substring(0,150)+"..."}</div>
      </li>
    </Link>
  );
}

export default function SearchPage() {
  const [results, setResults] =
    useState<typeof api.search.searchAction._returnType>(null);

  useEffect(() => {
    const storedResults = localStorage.getItem("searchResults");
    if (!storedResults) return;
    setResults(JSON.parse(storedResults));
  }, []);

  return (
    <main className="w-full space-y-8 p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Search</h1>
      </div>

      <SearchForm
        setResults={(searchResults) => {
          setResults(searchResults);
          localStorage.setItem("searchResults", JSON.stringify(searchResults));
        }}
      />

      <ul className="flex flex-col gap-4">
        {results?.map((result) => {
          if (result.type === "notes") {
            return (
              <SearchResult
                key={result.record._id}
                link={`/dashboard/notes/${result.record._id}`}
                type="notes"
                score={result.score}
                text={result.record.title + ": " + result.record.text}
              />
            );
          } else {
            return (
              <SearchResult
                key={result.record._id}
                link={`/dashboard/documents/${result.record._id}`}
                type="documents"
                score={result.score}
                text={result.record.title + ": " + result.record.description}
              />
            );
          }
        })}
      </ul>
    </main>
  );
}
