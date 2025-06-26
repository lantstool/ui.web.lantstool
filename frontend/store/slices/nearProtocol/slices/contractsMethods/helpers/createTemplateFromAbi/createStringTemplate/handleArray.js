import { transformSchema } from './createStringTemplate.js';
import { injectFieldMetadata } from './injectFieldMetadata.js';

export const handleArray = (schema) => {
  const arrayString = schema.value.reduce(
    (acc, valueSchema) => `\
    ${acc}\
    ${injectFieldMetadata(valueSchema)}\
    ${transformSchema(valueSchema)},\n`,
    '',
  );
  return `[\n${arrayString}]`;
};
