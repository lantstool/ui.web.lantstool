import { parseTypeSchema } from './createTemplateObject.js';

export const handleAnyOf = ({ typeSchema, rootSchema }) => {
  const { anyOf } = typeSchema;
  // anyOf is always array | null
  if (!Array.isArray(anyOf)) return { type: 'unknown' };

  // Check if this type is optional - has 'null' is one of them
  const isOptional = anyOf.some((type) => type.type === 'null');
  const listWithoutNull = anyOf.filter((type) => type.type !== 'null');
  const optionsNumber = listWithoutNull.length;

  // If there is only 1 option - handle as a plain type
  if (optionsNumber === 1) {
    const singleTypeObj = parseTypeSchema({
      typeSchema: listWithoutNull[0],
      rootSchema,
    });
    if (isOptional) singleTypeObj.isOptional = true;
    return singleTypeObj;
  }

  // If the options list contains more than 1 options - show the first one
  // and ignore others
  if (optionsNumber > 1) {
    const anyOfObj = {
      type: 'anyOf',
      optionsNumber,
      value: parseTypeSchema({
        typeSchema: listWithoutNull[0],
        rootSchema,
      }),
    };
    if (isOptional) anyOfObj.isOptional = true;
    return anyOfObj;
  }
  // Always return placeholder type
  return { type: 'unknown' };
};
