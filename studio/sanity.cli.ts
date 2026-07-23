import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || "",
    dataset: process.env.SANITY_STUDIO_DATASET || "production",
  },
  studioHost: "gabrielhumbertdev",
  deployment: {
    appId: "gg2kjmfd5c685l7lkpqrn1rk",
  },
});
