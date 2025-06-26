import { parseTypeSchema } from './createTemplateObject.js';

// Is this a short version of anyOf for primitives such as 'string', 'array' etc
export const handleTypeAsArray = ({ typeSchema, rootSchema }) => {
  const { type } = typeSchema;
  // Check if this type is optional - has 'null' is one of them
  const isOptional = type.includes('null');
  const listWithoutNull = type.filter((type) => type !== 'null');
  const optionsNumber = listWithoutNull.length;

  // If somehow the original array will contain more than 2 options - show the first one
  // and ignore others
  if (optionsNumber > 1) {
    const anyOfObj = {
      type: 'anyOfPrimitive',
      optionsNumber,
      value: parseTypeSchema({
        typeSchema: { ...typeSchema, type: listWithoutNull[0] },
        rootSchema,
      }),
    };
    if (isOptional) anyOfObj.isOptional = true;
    return anyOfObj;
  }

  // If after filtering only 1 option is present - handle as a plain type
  const primitiveTypeObj = parseTypeSchema({
    typeSchema: { ...typeSchema, type: listWithoutNull[0] },
    rootSchema,
  });
  if (isOptional) primitiveTypeObj.isOptional = true;
  return primitiveTypeObj;
};
