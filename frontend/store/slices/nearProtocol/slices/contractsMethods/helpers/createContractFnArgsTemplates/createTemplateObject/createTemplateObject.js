import { handleObject } from './handleObject.js';
import { handleArray } from './handleArray.js';
import { handleString } from './handleString.js';
import { handleInteger } from './handleInteger.js';
import { handleNumber } from './handleNumber.js';
import { handleBoolean } from './handleBoolean.js';
import { handleTypeAsArray } from './handleTypeAsArray.js';
import { handleRef } from './handleRef.js';
import { handleAnyOf } from './handleAnyOf.js';
import { handleOneOf } from './handleOneOf.js';

export const parseTypeSchema = ({ typeSchema, rootSchema }) => {
  if (typeSchema === false) return { type: 'never' };
  if (typeSchema.type === 'object') return handleObject({ typeSchema, rootSchema });
  if (typeSchema.type === 'array') return handleArray({ typeSchema, rootSchema });
  if (typeSchema.type === 'string') return handleString({ typeSchema, rootSchema });
  if (typeSchema.type === 'integer') return handleInteger({ typeSchema, rootSchema });
  if (typeSchema.type === 'number') return handleNumber({ typeSchema, rootSchema });
  if (typeSchema.type === 'boolean') return handleBoolean({ typeSchema, rootSchema });
  if (typeSchema.type === 'null') return { type: 'null' };
  if (Array.isArray(typeSchema.type)) return handleTypeAsArray({ typeSchema, rootSchema });
  if (typeSchema.$ref) return handleRef({ typeSchema, rootSchema });
  if (typeSchema.anyOf) return handleAnyOf({ typeSchema, rootSchema });
  if (typeSchema.oneOf) return handleOneOf({ typeSchema, rootSchema });
  return { type: 'unknown' };
};

export const createTemplateObject = (params, rootSchema) =>
  params.reduce((acc, param) => {
    acc[param.name] = parseTypeSchema({
      typeSchema: param.type_schema,
      rootSchema,
    });
    return acc;
  }, {});
