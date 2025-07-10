import type { StructureResolver } from "sanity/structure";
import { TagIcon, ImageIcon, UserIcon } from "@sanity/icons";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .id("root")
    .title("Portfolio")
    .items([
      S.documentTypeListItem("category").title("Categories").icon(TagIcon),
      S.documentTypeListItem("photo").title("Photos").icon(ImageIcon),
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
      S.divider(),
      S.documentTypeListItem("page").title("Pages"),
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          !["photo", "category", "about", "page"].includes(item.getId()!),
      ),
    ]);
