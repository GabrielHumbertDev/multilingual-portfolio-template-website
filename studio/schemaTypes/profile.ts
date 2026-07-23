import { defineField, defineType } from "sanity";

export const profile = defineType({
  name: "profile",
  title: "Profile and site settings",
  type: "document",
  fields: [
    defineField({ name: "displayName", title: "Display name", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "headline", title: "Headline", type: "localeString" }),
    defineField({ name: "introduction", title: "Introduction", type: "localeText" }),
    defineField({ name: "location", title: "Location", type: "localeString" }),
    defineField({ name: "email", title: "Public email", type: "email" }),
    defineField({ name: "linkedinUrl", title: "LinkedIn", type: "url" }),
    defineField({ name: "githubUrl", title: "GitHub", type: "url" }),
    defineField({ name: "portrait", title: "Portrait", type: "image", options: { hotspot: true } }),
    defineField({ name: "currentCv", title: "Current CV", type: "file", options: { accept: ".pdf,.doc,.docx" } }),
  ],
  preview: {
    select: { title: "displayName", media: "portrait" },
  },
});
