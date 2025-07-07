import { createTemplateObject } from './createTemplateObject/createTemplateObject.js';
import { createStringTemplate } from './createStringTemplate/createStringTemplate.js';

const MSG_NO_PARAMS = '// This function has no params specified in ABI';

const createFnArgsTemplate = async (abi, fn) => {
  try {
    if (!fn.params || fn.params?.args.length === 0) return MSG_NO_PARAMS;

    if (fn.params.serialization_type !== 'json')
      return '// This function use different serialization than JSON';

    const templateObject = createTemplateObject(fn.params.args, abi.body.root_schema);
    return await createStringTemplate(templateObject);
  } catch (e) {
    return `// Error during parsing ABI: ${e.message}`;
  }
};

export const createContractFnArgsTemplates = async (abiObject) => {

  if (abiObject.schema_version !== '0.4.0')
    throw new Error('Unsupported ABI version - only v0.4.0 is supported');

  const readFunctions = {
    __contract_abi: {
      argsTemplate: MSG_NO_PARAMS,
      modifiers: [],
    },
  };
  const writeFunctions = {};

  for (const fn of abiObject.body.functions) {
    const { name, modifiers = [], kind } = fn;
    const argsTemplate = await createFnArgsTemplate(abiObject, fn);
    const targetList = kind === 'view' ? readFunctions : writeFunctions;
    targetList[name] = { argsTemplate, modifiers };
  }

  return { readFunctions, writeFunctions };
};
