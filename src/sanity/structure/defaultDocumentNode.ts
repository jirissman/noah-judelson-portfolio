import type { DefaultDocumentNodeResolver } from "sanity/structure";
import DocumentsPane from "sanity-plugin-documents-pane";

export const defaultDocumentNode: DefaultDocumentNodeResolver = (
  S,
  { schemaType },
) => {
  switch (schemaType) {
    case `category`:
      return S.document().views([
        S.view.form(),
        S.view
          .component(DocumentsPane)
          .options({
            query: `*[_type == "photo" && references($id)]`,
            params: { id: `_id` },
            options: { perspective: "previewDrafts" },
          })
          .title("Photos"),
      ]);
    default:
      return S.document().views([S.view.form()]);
  }
};
