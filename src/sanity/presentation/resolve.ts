import {
  defineLocations,
  PresentationPluginOptions,
} from "sanity/presentation";

export const resolve: PresentationPluginOptions["resolve"] = {
  locations: {
    category: defineLocations({
      select: {
        title: "title",
        slug: "slug.current",
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || "Untitled Category",
            href: `/${doc?.slug}`,
          },
          { title: "Home", href: `/` },
        ],
      }),
    }),
    photo: defineLocations({
      select: {
        title: "title",
        category: "category.slug.current",
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || "Untitled Photo",
            href: doc?.category ? `/${doc.category}` : "/",
          },
          { title: "Home", href: `/` },
        ],
      }),
    }),
  },
};
