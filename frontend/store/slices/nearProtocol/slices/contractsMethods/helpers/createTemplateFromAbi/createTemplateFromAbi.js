import { createTemplateObject } from './createTemplateObject/createTemplateObject.js';
import { createStringTemplate } from './createStringTemplate/createStringTemplate.js';

export const createTemplateFromAbi = async (abi) => {
  const MSG_NO_PARAMS = '// This function has no params specified in ABI\n{}';
  const MSG_NON_JSON = '// This function uses a non-JSON serialization type\n{}';
  const MSG_ERROR = (msg) => `// Error during parsing ABI: ${msg}\n{}`;
  const readFunctions = {};
  const writeFunctions = {};

  try {
    for (const fn of abi.body.functions) {
      const { name, params, modifiers, kind } = fn;
      let args;

      if (!params || params.args.length === 0) {
        args = MSG_NO_PARAMS;
      } else if (params.serialization_type !== 'json') {
        args = MSG_NON_JSON;
      } else {
        try {
          const templateObject = createTemplateObject(params.args, abi.body.root_schema);
          args = await createStringTemplate(templateObject);
        } catch (e) {
          args = MSG_ERROR(e);
        }
      }

      const method = {
        args,
        modifiers: modifiers ?? null,
      };

      if (kind === 'view') readFunctions[name] = method;
      if (kind === 'call') writeFunctions[name] = method;
    }

    readFunctions.__contract_abi = {
      args: MSG_NO_PARAMS,
      modifiers: null,
    };

    return { isAbiSupported: true, readFunctions, writeFunctions };
  } catch (e) {
    console.log(e);
    return { isAbiSupported: false, functions: [] };
  }
};
