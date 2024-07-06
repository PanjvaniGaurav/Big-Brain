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
    <div className="w-full flex flex-col gap-2 p-4 h-[calc(100vh-320px)] bg-gray-900 rounded-lg mb-2 relative overflow-hidden">
      <div className="overflow-auto flex-1 space-y-4 pb-14"> {/* Add pb-20 for padding bottom */}
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
      <div className="absolute -bottom-8 left-0 right-0 bg-gray-900 px-2 overflow-hidden"> {/* Change -bottom-8 to bottom-0 */}
        <QuestionForm documentId={documentId} />
      </div>
    </div>
  );
};

export default ChatPanel;
