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
    <div className="w-full flex flex-col gap-2 p-4 h-[calc(100vh-320px)] bg-slate-200 dark:bg-gray-900 rounded-lg mb-2 relative overflow-hidden">
      <div className="overflow-auto flex-1 space-y-4 pb-14"> 
        <div className="dark:bg-slate-950 bg-slate-300 rounded p-3 dark:text-gray-300">
          AI: Ask any question about the document below
        </div>
        {chats?.map((chat, index) => (
          <div
            key={index}
            className={cn(
              "rounded p-3",
              chat.isHuman
                ? "dark:bg-slate-800 bg-gray-300 ml-auto max-w-[80%]"
                : "dark:bg-gray-950 bg-slate-300 mr-auto max-w-[80%]"
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
      <div className="absolute bottom-0 left-0 right-0 dark:bg-gray-900 px-2"> {/* Change -bottom-9 to bottom-0 */}
        <QuestionForm documentId={documentId} />
      </div>
    </div>
  );
};

export default ChatPanel;
