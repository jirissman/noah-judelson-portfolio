import type { StructureResolver } from "sanity/structure";
import { TagIcon, ImageIcon } from "@sanity/icons";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .id("root")
    .title("Content")
    .items([
      S.documentTypeListItem("category").title("Categories").icon(TagIcon),
      S.documentTypeListItem("photo").title("Photos").icon(ImageIcon),
    ]);
