export const getOptionsAndArgsTemplates = (contractFunctions, functionsType) => {
  if (!contractFunctions) return { options: [], argsTemplates: {} };

  const { isAbiSupported, functions, writeFunctions, readFunctions } = contractFunctions;

  const fn = functionsType === 'read' ? readFunctions : writeFunctions

  if (isAbiSupported) {
    const options = Object.entries(fn).map(([key, value]) => ({
      value: key,
      label: key,
      modifiers: value.modifiers,
    }));
    return { options, argsTemplates: fn };
  }
  // If ABI is not supported and only WASM functions is present
  const options = functions.map((fnName) => ({
    value: fnName,
    label: fnName,
    modifiers: [],
  }));

  const argsTemplates = functions.reduce((acc, fnName) => {
    acc[fnName] = {
      argsTemplate: '',
    };
    return acc;
  }, {});

  return { options, argsTemplates };
};