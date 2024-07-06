import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { title } from "process";

export default defineSchema({
  memberships: defineTable({
    orgId: v.string(),
    userId: v.string(),
  }).index("by_orgId_userId", ["orgId", "userId"]),
  documents: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    orgId: v.optional(v.string()),
    tokenIdentifier: v.optional(v.string()),
    embedding: v.optional(v.array(v.float64())),
    storageId: v.id("_storage"),
  }).index("by_tokenIdentifier", ["tokenIdentifier"])
  .index("by_orgId", ["orgId"])
  .vectorIndex("by_embedding", {
    vectorField: "embedding",
    dimensions: 768,
    filterFields: ["tokenIdentifier","orgId"],
  }),
  notes: defineTable({
    text: v.string(),
    title: v.string(),
    orgId: v.optional(v.string()),
    embedding: v.optional(v.array(v.float64())),
    tokenIdentifier: v.optional(v.string()),
  }).index("by_tokenIdentifier", ["tokenIdentifier"])
  .index("by_orgId", ["orgId"])
  .vectorIndex("by_embedding", {
    vectorField: "embedding",
    dimensions: 768,
    filterFields: ["tokenIdentifier","orgId"],
  }),
  chats: defineTable({
    documentId: v.id("documents"),
    tokenIdentifier: v.string(),
    isHuman: v.boolean(),
    text: v.string(),
  }).index("by_documentId_tokenIdentifier", ["documentId","tokenIdentifier"])
});
