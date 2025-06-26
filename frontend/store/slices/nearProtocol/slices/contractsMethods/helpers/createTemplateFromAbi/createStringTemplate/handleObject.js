import { transformSchema } from './createStringTemplate.js';
import { injectFieldMetadata } from './injectFieldMetadata.js';

/* Sort object keys - first required, last - optionals */
const getSortedFieldArray = (obj) => {
  const required = [];
  const optional = [];
  Object.entries(obj).forEach((field) => {
    field[1].isOptional ? optional.push(field) : required.push(field);
  });
  return [...required, ...optional];
};

export const handleObject = (schema) => {
  const objectString = getSortedFieldArray(schema.value).reduce(
    (acc, [key, valueSchema]) =>
      `${acc}
      ${injectFieldMetadata(valueSchema)}\
      ${key}: ${transformSchema(valueSchema)},`,
    ``,
  );
  return `{${objectString}}`;
};
