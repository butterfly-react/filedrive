import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";



export const roles = v.union(v.literal("admin"), v.literal("member"));

export default defineSchema({
  files: defineTable({ name: v.string() })
});
