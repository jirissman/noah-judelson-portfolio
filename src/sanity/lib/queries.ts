import { defineQuery } from "next-sanity";

export const CATEGORY_QUERY = defineQuery(`*[
  _type == "category"
  && defined(slug.current)
]|order(title asc)[0...3]{_id, title, slug, description, coverPhoto}`);

export const PHOTO_QUERY = defineQuery(`*[
_type == "category" &&
slug.current == $slug
 ][0]{
  "category": {_id, title},
  "photos": photos[]{
   "id": asset->_id,
   "url": asset->url,
   alt,
   "dimensions": asset->metadata.dimensions{
    aspectRatio,
    height,
    width
   },
   "preview": asset->metadata.lqip,
  }
 }`);

export const ABOUT_QUERY = defineQuery(`*[
  _type == "about"
][0]{
  title,
  body,
  image,
}`);
