import { defineField, defineType } from "sanity";

export const credential = defineType({
  name: "credential",
  title: "Certifications and credentials",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Official title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "provider", title: "Provider", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "status", title: "Status", type: "localeString" }),
    defineField({ name: "focus", title: "Focus", type: "localeText" }),
    defineField({ name: "issueDate", title: "Issue date", type: "date" }),
    defineField({ name: "expiryDate", title: "Expiry date", type: "date" }),
    defineField({ name: "verificationUrl", title: "Public verification URL", type: "url" }),
    defineField({ name: "certificateImage", title: "Certificate image", type: "image" }),
    defineField({ name: "certificateFile", title: "Certificate PDF", type: "file", options: { accept: ".pdf" } }),
    defineField({ name: "order", title: "Display order", type: "number", initialValue: 10 }),
    defineField({ name: "published", title: "Visible on website", type: "boolean", initialValue: false }),
  ],
  preview: {
    select: { title: "title", subtitle: "provider", media: "certificateImage" },
  },
});
