"use client";

import { infer, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import LoadingButton from "../../../components/LoadingButton";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  text: z.string().min(1).max(5000),
  title: z.string().min(1).max(30),
});

const CreateNoteForm = ({ onNoteCreated }: { onNoteCreated: () => void }) => {
  const createNote = useMutation(api.notes.createNotes);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
      title: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
 await createNote({
      text: values.text,
      title:values.title
    });
    
    onNoteCreated();
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            name="title"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Note Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="text"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Note</FormLabel>
                <FormControl>
                  <Textarea rows={9} placeholder="Enter your Text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <LoadingButton
            isLoading={form.formState.isSubmitting}
            loadingText="Creating..."
          >
            Create
          </LoadingButton>
        </form>
      </Form>
    </div>
  );
};

export default CreateNoteForm;
