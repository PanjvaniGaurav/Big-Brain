"use client";

import { infer, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import LoadingButton from "./LoadingButton";

const formSchema = z.object({
  title: z.string().min(1).max(250),
});

const UploadDocumentForm = ({ onUpload }: { onUpload: () => void }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    await createDocument(values);
    onUpload();
  }

  const createDocument = useMutation(api.documents.createDocument);

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            name="title"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Expense Report</FormLabel>
                <FormControl>
                  <Input placeholder="Expense Report" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <LoadingButton
            isLoading={form.formState.isSubmitting}
            loadingText="Uploading..."
          >
            Upload
          </LoadingButton>
        </form>
      </Form>
    </div>
  );
};

export default UploadDocumentForm;
