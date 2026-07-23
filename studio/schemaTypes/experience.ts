import { defineField, defineType } from "sanity";

export const experience = defineType({
  name: "experience",
  title: "Experience",
  type: "document",
  fields: [
    defineField({ name: "role", title: "Role", type: "localeString", validation: (rule) => rule.required() }),
    defineField({ name: "organisation", title: "Organisation", type: "localeString" }),
    defineField({ name: "dates", title: "Dates", type: "localeString" }),
    defineField({ name: "summary", title: "Public summary", type: "localeText" }),
    defineField({ name: "highlights", title: "Public highlights", type: "localeStringArray" }),
    defineField({ name: "order", title: "Display order", type: "number", initialValue: 10 }),
    defineField({ name: "published", title: "Visible on website", type: "boolean", initialValue: false }),
  ],
  preview: {
    select: { title: "role.en", subtitle: "organisation.en" },
  },
});
