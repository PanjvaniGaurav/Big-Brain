import { ConvexError, v } from "convex/values";
import {
  internalAction,
  internalMutation,
  mutation,
  query,
} from "./_generated/server";
import { internal } from "./_generated/api";
import { hasOrgAccess } from "./documents";
import { Id } from "./_generated/dataModel";
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function embed(text: string) {
  const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
  const result = await model.embedContent(text);
  const embedding = result.embedding.values;
  return embedding;
}

export const setNoteEmbedding = internalMutation({
  args: {
    noteId: v.id("notes"),
    embedding: v.array(v.float64()),
  },
  async handler(ctx, args) {
    await ctx.db.patch(args.noteId, { embedding: args.embedding });
  },
});

export const createNoteEmbedding = internalAction({
  args: {
    noteId: v.id("notes"),
    text: v.string(),
  },
  async handler(ctx, args) {
    const embedding = await embed(args.text);
    await ctx.runMutation(internal.notes.setNoteEmbedding, {
      noteId: args.noteId,
      embedding,
    });
  },
});

export const createNotes = mutation({
  args: {
    text: v.string(),
    title: v.string(),
    orgId: v.optional(v.string()),
  },
  async handler(ctx, args) {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if (!userId) {
      throw new ConvexError("You must be logged in to create notes");
    }
    let noteId: Id<"notes">;
    if (args.orgId) {
      const hasAccess = await hasOrgAccess(ctx, args.orgId);
      if (!hasAccess) {
        return null;
      }
      noteId = await ctx.db.insert("notes", {
        text: args.text,
        orgId: args.orgId,
        title: args.title,
      });
    } else {
      noteId = await ctx.db.insert("notes", {
        text: args.text,
        tokenIdentifier: userId,
        title: args.title,
      });
    }
    await ctx.scheduler.runAfter(0, internal.notes.createNoteEmbedding, {
      noteId,
      text: args.text,
    });
  },
});

export const getNotes = query({
  args: {
    orgId: v.optional(v.string()),
  },
  async handler(ctx, args) {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if (!userId) {
      return null;
    }
    if (args.orgId) {
      const hasAccess = await hasOrgAccess(ctx, args.orgId);
      if (!hasAccess) {
        return null;
      }
      const notes = await ctx.db
        .query("notes")
        .withIndex("by_orgId", (q) => q.eq("orgId", args.orgId))
        .collect();
      return notes;
    } else {
      const notes = await ctx.db
        .query("notes")
        .withIndex("by_tokenIdentifier", (q) => q.eq("tokenIdentifier", userId))
        .order("desc")
        .collect();
      return notes;
    }
  },
});

export const getNote = query({
  args: {
    noteId: v.id("notes"),
  },
  async handler(ctx, args) {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if (!userId) {
      return null;
    }

    const note = await ctx.db.get(args.noteId);
    if (!note) {
      return null;
    }
    if (note.orgId) {
      const hasAccess = await hasOrgAccess(ctx, note.orgId);
      if (!hasAccess) {
        return null;
      }
    } else {
      if (note.tokenIdentifier !== userId) {
        return null;
      }
    }
    return note;
  },
});

export const deleteNote = mutation({
  args: {
    noteId: v.id("notes"),
  },
  async handler(ctx, args) {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if (!userId) {
      throw new ConvexError("You must be logged in to delete notes");
    }

    const note = await ctx.db.get(args.noteId);
    if (!note) {
      throw new ConvexError("Note not found");
    }
    if (note.orgId) {
      const hasAccess = await hasOrgAccess(ctx, note.orgId);
      if (!hasAccess) {
        throw new ConvexError("You can't delete other's notes");
      }
    } else {
      if (note.tokenIdentifier !== userId) {
        throw new ConvexError("You can't delete other's notes");
      }
    }
    await ctx.db.delete(args.noteId);
  },
});

