"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import LoadingButton from "../../../../components/LoadingButton";

const formSchema = z.object({
  text: z.string().min(1).max(250),
});

const QuestionForm = ({ documentId }: { documentId: Id<"documents"> }) => {
  const askQuestion = useAction(api.documents.askQuestion);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await askQuestion({ question: values.text, documentId });
    form.reset();
  }

  return (
    <div className="w-full px-2 py-2 dark:bg-gray-900">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-col sm:flex-row gap-3"
        >
          <FormField
            name="text"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Ask any question about your document"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <LoadingButton
            isLoading={form.formState.isSubmitting}
            loadingText="Submitting..."
            className="w-full sm:w-auto"
          >
            Submit
          </LoadingButton>
        </form>
      </Form>
    </div>
  );
};

export default QuestionForm;