import { defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Projects",
  type: "document",
  fields: [
    defineField({ name: "number", title: "Display number", type: "string" }),
    defineField({ name: "title", title: "Title", type: "localeString", validation: (rule) => rule.required() }),
    defineField({ name: "kicker", title: "Category label", type: "localeString" }),
    defineField({ name: "summary", title: "Summary", type: "localeText" }),
    defineField({ name: "stack", title: "Technology stack", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "repositoryUrl", title: "Repository URL", type: "url" }),
    defineField({ name: "liveUrl", title: "Live URL", type: "url" }),
    defineField({ name: "cover", title: "Cover image", type: "image", options: { hotspot: true } }),
    defineField({ name: "order", title: "Display order", type: "number", initialValue: 10 }),
    defineField({ name: "published", title: "Visible on website", type: "boolean", initialValue: false }),
  ],
  preview: {
    select: { title: "title.en", subtitle: "kicker.en", media: "cover" },
  },
});
