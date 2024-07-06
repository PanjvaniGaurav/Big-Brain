import {
  MutationCtx,
  QueryCtx,
  action,
  internalAction,
  internalMutation,
  internalQuery,
  mutation,
  query,
} from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { api, internal } from "./_generated/api";
import { chatSession } from "../helper/geminiCall";
import { Id } from "./_generated/dataModel";
import { embed } from "./notes";

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export async function hasAccess(
  ctx: MutationCtx | QueryCtx,
  documentId: Id<"documents">
) {
  const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

  if (!userId) {
    return null;
  }

  const document = await ctx.db.get(documentId);
  if (!document) {
    return null;
  }

  if (document.tokenIdentifier !== userId) {
    return null;
  }

  return { document, userId };
}

export const getDocuments = query({
  handler: async (ctx) => {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

    if (!userId) {
      return undefined;
    }
    return await ctx.db
      .query("documents")
      .withIndex("by_tokenIdentifier", (q) => q.eq("tokenIdentifier", userId))
      .collect();
  },
});

export const getDocument = query({
  args: {
    documentId: v.id("documents"),
  },
  handler: async (ctx, args) => {
    const accessObj = await hasAccess(ctx, args.documentId);
    if (!accessObj) {
      return null;
    }
    return {
      ...accessObj.document,
      documentUrl: await ctx.storage.getUrl(accessObj.document.storageId),
    };
  },
});

export const createDocument = mutation({
  args: {
    title: v.string(),
    storageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if (!userId) {
      throw new ConvexError("Not authenticated");
    }

    const documentId = await ctx.db.insert("documents", {
      title: args.title,
      description: "",
      tokenIdentifier: userId,
      storageId: args.storageId,
    });

    await ctx.scheduler.runAfter(
      0,
      internal.documents.generateDocumentDescription,
      {
        documentId: documentId,
        storageId: args.storageId,
      }
    );
  },
});

export const hasAccessToDocumentQuery = internalQuery({
  args: {
    documentId: v.id("documents"),
  },
  async handler(ctx, args) {
    return await hasAccess(ctx, args.documentId);
  },
});

export const generateDocumentDescription = internalAction({
  args: {
    documentId: v.id("documents"),
    storageId: v.id("_storage"),
  },
  async handler(ctx, args) {
    const file = await ctx.storage.get(args.storageId);
    if (!file) {
      throw new ConvexError("File not found");
    }

    const textFile = await file.text();
    const prompt = `This is the text of the document: ${textFile}
                    and i want you to generate a description for this document.
                    the description should be precise and not more than 200 characters.`;
    const response = (await chatSession.sendMessage(prompt)) as any;
    const description =
      response.response.candidates[0].content.parts[0].text ??
      "Couldn't generate description for this document";

    const embedding = await embed(description);
    await ctx.runMutation(internal.documents.updateDocumentDescription, {
      documentId: args.documentId,
      description: description,
      embedding
    });
  },
});

export const updateDocumentDescription = internalMutation({
  args: {
    documentId: v.id("documents"),
    description: v.string(),
    embedding: v.array(v.float64())
  },
  async handler(ctx, args) {
    await ctx.db.patch(args.documentId, {
      description: args.description,
      embedding: args.embedding
    });
  },
});

export const askQuestion = action({
  args: {
    question: v.string(),
    documentId: v.id("documents"),
  },
  async handler(ctx, args) {
    const accessObj = await ctx.runQuery(
      internal.documents.hasAccessToDocumentQuery,
      {
        documentId: args.documentId,
      }
    );

    if (!accessObj) {
      throw new ConvexError("You do not have access to document");
    }

    const file = await ctx.storage.get(accessObj.document.storageId);
    if (!file) {
      throw new ConvexError("File not found");
    }

    const textFile = await file.text();
    const prompt = `This is the text of the document: ${textFile}
                    and i want you to answer the following question about the document
                    the question is ${args.question} and don't say like this documents states that 
                    just answer the question directly as if you are answering a question in a conversation.
                    Understand the context of the file and answer the question.`;
    const response = (await chatSession.sendMessage(prompt)) as any;
    const text =
      response.response.candidates[0].content.parts[0].text ??
      "Sorry, I am not able to answer this question";

    await ctx.runMutation(internal.chats.createChatRecord, {
      documentId: args.documentId,
      text: args.question,
      isHuman: true,
      tokenIdentifier: accessObj.userId,
    });

    await ctx.runMutation(internal.chats.createChatRecord, {
      documentId: args.documentId,
      text,
      isHuman: false,
      tokenIdentifier: accessObj.userId,
    });

    return text;
  },
});

export const deleteDocument = mutation({
  args: {
    documentId: v.id("documents"),
  },
  async handler(ctx, args) {
    const accessObj = await hasAccess(ctx, args.documentId);

    if (!accessObj) {
      throw new ConvexError("You do not have access to document");
    }
    await ctx.storage.delete(accessObj.document.storageId);
    await ctx.db.delete(args.documentId);
  },
});
