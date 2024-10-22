const findOptionByValue = (options, targetValue) => {
  for (const option of options) {
    if (option.options) {
      const found = findOptionByValue(option.options, targetValue);
      if (found) return found;
    }
    if (option.value === targetValue) return option;
  }
  return '';
};


export const getValue = (options, targetValue) => {
  const result = findOptionByValue(options, targetValue);
  // When we want to create a new option
  if (targetValue && !result)
    return {
      value: targetValue,
      label: targetValue,
      __isNew__: true,
    };

  return result;
};
