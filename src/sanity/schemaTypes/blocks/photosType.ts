import { defineField, defineType } from "sanity";

export const photosType = defineType({
  name: "photos",
  title: "Photos",
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
});
