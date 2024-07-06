import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { title } from "process";

export default defineSchema({
  documents: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    tokenIdentifier: v.string(),
    embedding: v.optional(v.array(v.float64())),
    storageId: v.id("_storage"),
  }).index("by_tokenIdentifier", ["tokenIdentifier"])
  .vectorIndex("by_embedding", {
    vectorField: "embedding",
    dimensions: 768,
    filterFields: ["tokenIdentifier"],
  }),
  notes: defineTable({
    text: v.string(),
    title: v.string(),
    embedding: v.optional(v.array(v.float64())),
    tokenIdentifier: v.string(),
  }).index("by_tokenIdentifier", ["tokenIdentifier"])
  .vectorIndex("by_embedding", {
    vectorField: "embedding",
    dimensions: 768,
    filterFields: ["tokenIdentifier"],
  }),
  chats: defineTable({
    documentId: v.id("documents"),
    tokenIdentifier: v.string(),
    isHuman: v.boolean(),
    text: v.string(),
  }).index("by_documentId_tokenIdentifier", ["documentId","tokenIdentifier"])
});
