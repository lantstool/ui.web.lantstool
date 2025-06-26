import pkg from 'lodash';
const { get } = pkg;

import { parseTypeSchema } from './createTemplateObject.js';

export const handleRef = ({ typeSchema, rootSchema }) => {
  const refPath = typeSchema.$ref.replace('#/', '').split('/');
  const resolvedRef = get(rootSchema, refPath, 'unknown');
  return parseTypeSchema({ typeSchema: resolvedRef, rootSchema });
};
