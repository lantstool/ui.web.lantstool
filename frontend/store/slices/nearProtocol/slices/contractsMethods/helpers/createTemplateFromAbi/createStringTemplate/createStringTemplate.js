import prettier from 'prettier/standalone.mjs';
import prettierEstreePlugin from 'prettier/plugins/estree.mjs'
import prettierBabelPlugin from 'prettier/plugins/babel.mjs'
import { handleArray } from './handleArray.js';
import { handleObject } from './handleObject.js';


export const transformSchema = (schema) => {
  const { type } = schema;
  if (type === 'object') return handleObject(schema);
  if (type === 'array') return handleArray(schema);
  if (type === 'oneOf') return transformSchema(schema.value);
  if (type === 'anyOf') return transformSchema(schema.value);
  if (type === 'integer') return schema.value;
  if (type === 'number') return schema.value;
  if (type === 'boolean') return schema.value;
  if (type === 'string') return schema.value;
  if (type === 'stringEnum') return schema.value;
  if (type === 'stringConst') return schema.value;
  if (type === 'null') return null;
  if (type === 'never') return `'never'`;
  return `'unknown'`;
};

export const createStringTemplate = async (templateObject) => {
  const rawString = transformSchema({ type: 'object', value: templateObject });

  return await prettier.format(rawString, {
    parser: 'json5',
    plugins: [prettierBabelPlugin, prettierEstreePlugin],
    printWidth: 100,
    singleQuote: true,
    trailingComma: 'all',
    endOfLine: 'lf',
  });
};
