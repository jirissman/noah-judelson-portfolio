import { defineField, defineType } from "sanity";
import { BookIcon } from "@sanity/icons";

export const photoGalleryType = defineType({
  name: "photoGallery",
  title: "Photo Gallery",
  type: "object",
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "photos",
      title: "Photos",
      type: "array",
      of: [{ type: "reference", to: [{ type: "photo" }] }],
    }),
  ],
  icon: BookIcon,
  preview: {
    select: {
      title: "title",
      media: "photos.0.image",
    },
    prepare({ title, media }) {
      return {
        title,
        subtitle: "Photo Gallery",
        media: media ?? BookIcon,
      };
    },
  },
});
