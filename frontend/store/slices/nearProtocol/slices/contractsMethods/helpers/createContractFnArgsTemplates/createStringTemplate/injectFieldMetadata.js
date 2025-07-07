const getOptionsType = (type, optionsNumber) => {
  if (type === 'anyOf') return `AnyOf 1/${optionsNumber}`;
  if (type === 'oneOf') return `OneOf 1/${optionsNumber}`;
  if (type === 'stringEnum') return `Enum 1/${optionsNumber}`;
  return '';
};

export const injectFieldMetadata = (schema) => {
  const { type, isOptional, optionsNumber } = schema;
  const optionsText = getOptionsType(type, optionsNumber);

  if (!isOptional && !optionsText) return '';
  if (isOptional && !optionsText) return `/* Optional */\n`;
  if (!isOptional && optionsText) return `/* ${optionsText} */\n`;
  if (isOptional && optionsText) return `/* Optional, ${optionsText} */\n`;
};
