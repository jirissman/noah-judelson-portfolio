import { type SchemaTypeDefinition } from "sanity";
import { aboutType } from "./schemaTypes/aboutType";
import { categoryType } from "./schemaTypes/categoryType";
import { pageType } from "./schemaTypes/pageType";
import { pageBuilderType } from "./schemaTypes/pageBuilderType";
import { photoType } from "./schemaTypes/photoType";
import { photosType } from "./schemaTypes/blocks/photosType";
import { heroType } from "./schemaTypes/blocks/heroType";
import { splitImageType } from "./schemaTypes/blocks/splitImageType";
import { contactType } from "./schemaTypes/contactType";
import { blockContentType } from "./schemaTypes/blocks/blockContentType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    aboutType,
    blockContentType,
    categoryType,
    contactType,
    heroType,
    pageType,
    pageBuilderType,
    photoType,
    photosType,
    splitImageType,
  ],
};
