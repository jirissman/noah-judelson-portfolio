import { defineField, defineType } from "sanity";
import { EnvelopeIcon } from "@sanity/icons";

export const contactType = defineType({
  name: "contact",
  title: "Contact",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "body",
      type: "blockContent",
    }),
  ],
  icon: EnvelopeIcon,
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title,
        subtitle: "Call to Action",
      };
    },
  },
});
