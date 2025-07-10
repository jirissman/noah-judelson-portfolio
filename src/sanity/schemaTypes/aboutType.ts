import { defineType, defineField } from "sanity";

export const aboutType = defineType({
  name: "about",
  title: "About",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [{ type: "block" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      validation: (rule) => rule.required(),
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative Text",
          description: "Important for SEO and accessibility.",
          validation: (Rule) =>
            Rule.custom((value, context) => {
              // Only require alt text if an image is uploaded
              const parent = context.parent as { asset?: { _ref: string } };
              if (parent?.asset?._ref && !value) {
                return "Alt text is required when an image is uploaded";
              }
              return true;
            }),
        }),
      ],
    }),
  ],
});
