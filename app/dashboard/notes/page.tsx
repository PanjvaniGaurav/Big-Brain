"use client";
import React from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useOrganization } from "@clerk/nextjs";

const page = () => {
  const organization = useOrganization();
  const orgId = organization.organization?.id;
  const notes = useQuery(api.notes.getNotes,{orgId});
  return (
    <div className="w-full space-y-8 text-xl font-bold">
      {notes && notes?.length >0 && "Please select a note to view and edit."}
      
    </div>
  );
};

export default page;
