import { defineQuery } from "next-sanity";

export const CATEGORY_QUERY = defineQuery(`*[
  _type == "category"
  && defined(slug.current)
]|order(title asc)[0...3]{_id, title, slug, description, coverPhoto}`);

export const PHOTO_QUERY = defineQuery(`*[
    _type == "category" &&
    slug.current == $slug
  ][0].photos[]{
    ...,
    asset->{
      ...,
      metadata
    }
  }`);

export const ABOUT_QUERY = defineQuery(`*[
  _type == "about"
][0]{
  title,
  body,
  image,
}`);
