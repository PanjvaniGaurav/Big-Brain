import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useAction } from "convex/react";
import React from "react";

const ChatPanel = ({ documentId }: { documentId: Id<"documents"> }) => {
  const askQuestion = useAction(api.documents.askQuestion);

  return (
    <div className="bg-gray-800 p-4 w-[300px] flex flex-col gap-2 rounded-lg justify-between">
      <div className="overflow-auto m-2">
        <div>hello</div>
        <div>hello</div>
        <div>hello</div>
        <div>hello</div>
        <div>hello</div>
        <div>hello</div>
        <div>hello</div>
        <div>hello</div>
        <div>hello</div>
        <div>hello</div>
        <div>hello</div>
        <div>hello</div>
        <div>hello</div>
        <div>hello</div>
        <div>hello</div>
        <div>hello</div>
        <div>hello</div>
        <div>hello</div>
        <div>hello</div>
        <div>hello</div>
        <div>hello</div>
      </div>
      <div>
        <form
          className="flex gap-2"
          onSubmit={async (event) => {
            event.preventDefault();
            const form = event.target as HTMLFormElement;
            const formData = new FormData(form);
            const text = formData.get("text") as string;
            const response = await askQuestion({ question: text, documentId })
            console.log(response)
          }}
        >
          <Input required name="text" />
          <Button>Submit</Button>
        </form>
      </div>
    </div>
  );
};

export default ChatPanel;
