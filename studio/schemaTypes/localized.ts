import { defineType } from "sanity";

export const localeString = defineType({
  name: "localeString",
  title: "Translated short text",
  type: "object",
  fields: [
    { name: "en", title: "English", type: "string", validation: (rule) => rule.required() },
    { name: "es", title: "Spanish", type: "string" },
    { name: "ptBr", title: "Portuguese (Brazil)", type: "string" },
  ],
});

export const localeText = defineType({
  name: "localeText",
  title: "Translated long text",
  type: "object",
  fields: [
    { name: "en", title: "English", type: "text", rows: 4, validation: (rule) => rule.required() },
    { name: "es", title: "Spanish", type: "text", rows: 4 },
    { name: "ptBr", title: "Portuguese (Brazil)", type: "text", rows: 4 },
  ],
});

export const localeStringArray = defineType({
  name: "localeStringArray",
  title: "Translated list",
  type: "object",
  fields: [
    { name: "en", title: "English", type: "array", of: [{ type: "string" }] },
    { name: "es", title: "Spanish", type: "array", of: [{ type: "string" }] },
    { name: "ptBr", title: "Portuguese (Brazil)", type: "array", of: [{ type: "string" }] },
  ],
});
