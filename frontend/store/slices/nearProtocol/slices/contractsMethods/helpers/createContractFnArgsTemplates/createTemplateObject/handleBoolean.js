export const handleBoolean = ({ typeSchema }) => {
  const boolObj = {
    type: 'boolean',
    value: `'boolean'`,
  };

  if (typeof typeSchema.default === 'boolean') boolObj.value = typeSchema.default;

  return boolObj;
};
