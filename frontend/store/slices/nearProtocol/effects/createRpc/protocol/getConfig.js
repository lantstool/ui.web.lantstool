import { toCamelCase } from '../../../../../helpers/toCamelCase.js';

export const getConfig =
  (provider) =>
  async (finality = 'final') => {
    const response = await provider.experimental_protocolConfig({
      finality,
    });
    return toCamelCase(response);
  };
