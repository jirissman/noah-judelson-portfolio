import { type SchemaTypeDefinition } from "sanity";
import { aboutType } from "./schemaTypes/aboutType";
import { categoryType } from "./schemaTypes/categoryType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [aboutType, categoryType],
};
