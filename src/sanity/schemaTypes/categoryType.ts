import { defineField, defineType } from "sanity";

export const categoryType = defineType({
  name: "category",
  title: "Category",
  type: "document",
  groups: [
    {
      name: "photos",
      title: "Photos",
    },
  ],
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "coverPhoto",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "photos",
      type: "array",
      title: "Photos",
      group: "photos",
      of: [
        defineField({
          name: "image",
          type: "image",
          title: "Photo",
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: "alt",
              type: "string",
              title: "Alternative text",
              description: "Important for SEO and accessibility.",
              validation: (rule) =>
                rule
                  .required()
                  .warning(
                    "Consider adding alt text for better accessibility and SEO",
                  ),
            }),
          ],
        }),
      ],
      options: {
        layout: "grid",
      },
    }),
  ],
  preview: {
    select: {
      title: "title",
      images: "photos",
      image: "coverPhoto",
    },
    prepare(selection) {
      const { title, images, image } = selection;

      return {
        title: title,
        subtitle: `${images ? Object.keys(images).length : 0} photos`,
        media: image,
      };
    },
  },
});
