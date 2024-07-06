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
import { Input } from "@/components/ui/input";
import LoadingButton from "./LoadingButton";
import { Id } from "@/convex/_generated/dataModel";
import { useOrganization } from "@clerk/nextjs";

const formSchema = z.object({
  title: z.string().min(1).max(250),
  file: z.instanceof(File),
});

const UploadDocumentForm = ({ onUpload }: { onUpload: () => void }) => {
  const organization = useOrganization();
  const createDocument = useMutation(api.documents.createDocument);
  const generateUploadUrl = useMutation(api.documents.generateUploadUrl);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const url = await generateUploadUrl();
    const result = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": values.file.type },
      body: values.file,
    });
    const { storageId } = await result.json();
    await createDocument({
      title: values.title,
      storageId : storageId as Id<"_storage">,
      orgId: organization.organization?.id,
    });
    onUpload();
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
                <FormLabel>Expense Report</FormLabel>
                <FormControl>
                  <Input placeholder="Expense Report" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="file"
            control={form.control}
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem>
                <FormLabel>File</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept=".xml,.txt"
                    {...fieldProps}
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      onChange(file);
                    }}
                  />
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
