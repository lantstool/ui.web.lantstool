import { JsonRpcProvider } from 'near-api-js/lib/providers';
import { effect } from '../../../../../../react-vault/index.js';
import { account } from './account/index.js';
import { keys } from './keys/index.js';
import { protocol } from './protocol/index.js';

const withProvider = (provider, methods) =>
  Object.entries(methods).reduce((acc, [key, value]) => {
    if (typeof value === 'function') {
      acc[key] = value(provider);
    } else {
      acc[key] = withProvider(provider, value);
    }
    return acc;
  }, {});

export const createRpc = effect(async ({ store, payload }) => {
  const [backend] = store.getEntities((store) => store.backend);

  const url = await backend.sendRequest('nearProtocol.networks.getActiveRpc', payload);
  const provider = new JsonRpcProvider({ url });

  return withProvider(provider, {
    account,
    keys,
    protocol,
  });
});
