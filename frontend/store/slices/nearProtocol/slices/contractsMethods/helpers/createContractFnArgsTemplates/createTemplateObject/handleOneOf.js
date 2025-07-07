import { parseTypeSchema } from './createTemplateObject.js';

export const handleOneOf = ({ typeSchema, rootSchema }) => {
  const { oneOf } = typeSchema;
  // anyOf is always array | null
  if (!Array.isArray(oneOf)) return { type: 'unknown' };

  // Check if this type is optional - has 'null' is one of them
  const isOptional = oneOf.some((type) => type.type === 'null');
  const listWithoutNull = oneOf.filter((type) => type.type !== 'null');
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
    const oneOfObj = {
      type: 'oneOf',
      optionsNumber,
      value: parseTypeSchema({
        typeSchema: listWithoutNull[0],
        rootSchema,
      }),
    };
    if (isOptional) oneOfObj.isOptional = true;
    return oneOfObj;
  }
  // Always return placeholder type
  return { type: 'unknown' };
};
