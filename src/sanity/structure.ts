import type { StructureResolver } from "sanity/structure";
import { TagIcon, UserIcon } from "@sanity/icons";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .id("root")
    .title("Content")
    .items([
      S.documentTypeListItem("category").title("Categories").icon(TagIcon),
      S.documentTypeListItem("about")
        .title("About")
        .icon(UserIcon)
        .child(
          S.editor()
            .id("aboutEditor")
            .schemaType("about")
            .documentId("about")
            .title("Edit About Page"),
        ),
    ]);
