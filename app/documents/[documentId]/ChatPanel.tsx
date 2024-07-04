import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useAction, useQuery } from "convex/react";
import React from "react";
import QuestionForm from "./QuestionForm";

const ChatPanel = ({ documentId }: { documentId: Id<"documents"> }) => {
  const chats = useQuery(api.chats.getChatForDocument, { documentId });

  return (
    <div className="w-full h-full flex flex-col gap-2 p-4 bg-gray-900 rounded-lg mb-2">
      <div className="flex-1 overflow-auto space-y-2">
        <div className="bg-slate-950 rounded p-2">
          AI: Ask any Question using AI about the document below
        </div>
        {chats?.map((chat) => (
          <div
            className={cn(
              {
                "bg-slate-800": chat.isHuman,
                "bg-slate-950": !chat.isHuman,
                "text-right": chat.isHuman,
              },
              "rounded-md whitespace-pre-line p-2 space-y-4"
            )}
          >
            {chat.isHuman ? "You" : "AI"}: {chat.text}
          </div>
        ))}
      </div>
      <QuestionForm documentId={documentId} />
    </div>
  );
};

export default ChatPanel;
