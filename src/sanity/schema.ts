import { type SchemaTypeDefinition } from "sanity";
import { aboutType } from "./schemaTypes/aboutType";
import { categoryType } from "./schemaTypes/categoryType";
import { photoType } from "./schemaTypes/photoType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [aboutType, categoryType, photoType],
};
