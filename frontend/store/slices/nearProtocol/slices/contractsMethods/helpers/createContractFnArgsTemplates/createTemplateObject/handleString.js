export const handleString = ({ typeSchema }) => {
  if (typeSchema?.enum?.length === 1)
    return {
      type: 'stringConst',
      value: `'${typeSchema.enum[0]}'`,
    };

  if (typeSchema?.enum?.length > 1)
    return {
      type: 'stringEnum',
      value: `'${typeSchema.enum[0]}'`,
      optionsNumber: typeSchema.enum.length,
    };

  return {
    type: 'string',
    value: `'string'`,
  };
};
