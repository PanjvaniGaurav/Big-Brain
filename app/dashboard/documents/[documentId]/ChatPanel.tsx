import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useQuery } from "convex/react";
import React from "react";
import QuestionForm from "./QuestionForm";
import FormattedAIResponse from "../../../../components/FormattedAIResponse";

const ChatPanel = ({ documentId }: { documentId: Id<"documents"> }) => {
  const chats = useQuery(api.chats.getChatForDocument, { documentId });

  return (
    <div className="w-full h-full flex flex-col gap-2 p-4 bg-gray-900 rounded-lg mb-2">
      <div className="flex-1 overflow-auto space-y-4">
        <div className="bg-slate-950 rounded p-3 text-gray-300">
          AI: Ask any question about the document below
        </div>
        {chats?.map((chat, index) => (
          <div
            key={index}
            className={cn(
              "rounded p-3",
              chat.isHuman
                ? "bg-slate-800 text-white ml-auto max-w-[80%]"
                : "bg-gray-950 text-gray-200 mr-auto max-w-[80%]"
            )}
          >
            <div className="font-semibold mb-1">
              {chat.isHuman ? "You" : "AI"}:
            </div>
            {chat.isHuman ? (
              <div>{chat.text}</div>
            ) : (
              <FormattedAIResponse text={chat.text} />
            )}
          </div>
        ))}
      </div>
      <QuestionForm documentId={documentId} />
    </div>
  );
};

export default ChatPanel;
