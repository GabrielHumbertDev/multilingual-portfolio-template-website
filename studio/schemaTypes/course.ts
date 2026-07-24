import { defineField, defineType } from "sanity";

export const course = defineType({
  name: "course",
  title: "Courses and learning",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Course title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "provider", title: "Provider", type: "string" }),
    defineField({
      name: "stage",
      title: "Stage",
      type: "string",
      options: {
        list: [
          { title: "Planned", value: "planned" },
          { title: "In progress", value: "inProgress" },
          { title: "Completed", value: "completed" },
        ],
      },
    }),
    defineField({ name: "description", title: "Description", type: "localeText" }),
    defineField({ name: "progress", title: "Progress percentage", type: "number", validation: (rule) => rule.min(0).max(100) }),
    defineField({ name: "courseUrl", title: "Course URL", type: "url" }),
    defineField({ name: "evidence", title: "Evidence or certificate", type: "file" }),
    defineField({ name: "order", title: "Display order", type: "number", initialValue: 10 }),
    defineField({ name: "published", title: "Visible on website", type: "boolean", initialValue: false }),
  ],
  preview: {
    select: { title: "title", subtitle: "provider" },
  },
});
