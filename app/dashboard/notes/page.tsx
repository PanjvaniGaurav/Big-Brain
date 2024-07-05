"use client";
import React from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const page = () => {
  const notes = useQuery(api.notes.getNotes);
  return (
    <div className="w-full space-y-8 text-xl font-bold">
      {notes && notes?.length >0 && "Please select a note to view and edit."}
      
    </div>
  );
};

export default page;
