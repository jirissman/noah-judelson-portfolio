import { defineQuery } from "next-sanity";

export const CATEGORY_QUERY = defineQuery(`*[
  _type == "category"
  && defined(slug.current)
]|order(title asc)[0...3]{_id, title, slug, description, coverPhoto}`);

export const PHOTO_QUERY = defineQuery(`*[
    _type == "photo" &&
    category->slug.current == $slug
  ]{title, image}`);

export const ABOUT_QUERY = defineQuery(`*[
  _type == "about"
][0]{
  title,
  body,
  image,
}`);

export const PAGE_QUERY =
  defineQuery(`*[_type == "page" && slug.current == $slug][0]{
  ...,
  content[]{
    ...,
    _type == "photoGallery" => {
      ...,
      photoGallery[]->
    }
  }
}`);
