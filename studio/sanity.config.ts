import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";
import { structure } from "./structure";

export default defineConfig({
  name: "professional-portfolio",
  title: "Professional Portfolio Studio",
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || "",
  dataset: process.env.SANITY_STUDIO_DATASET || "production",
  plugins: [structureTool({ structure }), visionTool()],
  schema: { types: schemaTypes },
  document: {
    actions: (previousActions, context) =>
      context.schemaType === "profile"
        ? previousActions.filter(
            ({ action }) => action !== "delete" && action !== "duplicate",
          )
        : previousActions,
  },
});
