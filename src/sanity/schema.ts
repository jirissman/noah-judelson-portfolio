import { type SchemaTypeDefinition } from 'sanity'
import { categoryType } from './schemaTypes/categoryType'
import { photoType } from './schemaTypes/photoType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    categoryType,
    photoType,
  ],
}
