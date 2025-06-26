import { parseTypeSchema } from './createTemplateObject.js';

/**
 *  If "items" is a schema, validation succeeds if all elements in the
 *  array successfully validate against that schema.
 *
 *  If "items" is an array of schemas, validation succeeds if each
 *  element of the instance validates against the schema at the same
 *  position, if any.
 *
 *  https://datatracker.ietf.org/doc/html/draft-handrews-json-schema-02#section-9.3.1.1
 */
export const handleArray = ({ typeSchema, rootSchema }) => {
  const arrayObj = {
    type: 'array',
    value: [{ type: 'unknown' }],
  };

  // If array should have the exact item types/order that described
  if (Array.isArray(typeSchema?.items)) {
    arrayObj.value = typeSchema.items.map((item) =>
      parseTypeSchema({ typeSchema: item, rootSchema }),
    );
    return arrayObj;
  }

  // If there are only 1 type with describe every array  item
  if (typeof typeSchema.items === 'object') {
    arrayObj.value = [
      parseTypeSchema({ typeSchema: typeSchema.items, rootSchema,
      }),
    ];
    return arrayObj;
  }

  return arrayObj;
};
