import type { StructureResolver } from "sanity/structure";

const singletonTypes = new Set(["profile"]);

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Portfolio content")
    .items([
      S.listItem()
        .title("Profile and site settings")
        .id("profile")
        .child(S.document().schemaType("profile").documentId("profile")),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => !singletonTypes.has(item.getId() ?? ""),
      ),
    ]);
