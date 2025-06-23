import { parseTypeSchema } from './createTemplateObject.js';

export const handleObject = ({ typeSchema, rootSchema }) => {
  // TODO Think how to handle case when object has 'default' field
  const baseObj = {
    type: 'object',
    value: {},
  };

  if (typeSchema.properties) {
    Object.entries(typeSchema.properties).forEach(([key, value]) => {
      baseObj.value[key] = parseTypeSchema({ typeSchema: value, rootSchema });
    });
  }

  // Mark all properties as optional if they are not in the 'required' list
  if (typeSchema.required) {
    const requiredSet = new Set(typeSchema.required);
    Object.keys(typeSchema.properties).forEach((key) => {
      if (requiredSet.has(key)) return; // Return if field is required
      baseObj.value[key].isOptional = true;
    });
  }

  // TODO: Check if baseObj already contains '$additionalProperties'. If so - use another placeholder
  if (typeSchema.additionalProperties) {
    baseObj.value['$additionalProperties'] = parseTypeSchema({
      typeSchema: typeSchema.additionalProperties,
      rootSchema,
    });
  }

  // Add options to the object keys
  // oneOf always contains only 'object' types - 'null' is not possible
  if (typeSchema.oneOf) {
    const obj = parseTypeSchema({ typeSchema: typeSchema.oneOf[0], rootSchema });
    Object.entries(obj.value).forEach(([key, value]) => {
      baseObj.value[key] = value;
    });
  }

  // If multiple options present - show the comment
  if (typeSchema?.oneOf?.length > 1) {
    return {
      type: 'oneOf',
      optionsNumber: typeSchema.oneOf.length,
      value: baseObj,
    };
  }

  return baseObj;
};

