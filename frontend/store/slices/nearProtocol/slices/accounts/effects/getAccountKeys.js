import { effect } from '../../../../../../../react-vault/index.js';
import { viewAccessKeyList } from '../../../../../helpers/rpc/viewAccessKeyList.js';
import { toCamelCase } from '../../../../../helpers/toCamelCase.js';

const getKeys = (onChainAccountKeys, allLocalKeys) => {
  const localKeysSet = new Set(allLocalKeys);

  return onChainAccountKeys.reduce(
    (acc, key) => {
      key.isLocalExists = localKeysSet.has(key.publicKey);
      key.accessKey.permission === 'FullAccess'
        ? acc.fullAccess.push(key)
        : acc.functionCall.push(key);
      return acc;
    },
    { fullAccess: [], functionCall: [] },
  );
};

export const getAccountKeys = effect(async ({ store, payload }) => {
  const { spaceId, networkId, accountId } = payload;
  const [backend] = store.getEntities((store) => store.backend);
  const getActiveRpc = store.getEffects((store) => store.nearProtocol.networks.getActiveRpc);

  try {
    const rpc = await getActiveRpc({ spaceId, networkId });

    const response = await viewAccessKeyList(accountId, rpc);
    const onChainAccountKeys = toCamelCase(response.result.keys);

    const allLocalKeys = await backend.sendRequest('nearProtocol.keys.getIds', {
      spaceId,
      networkId,
    });

    return getKeys(onChainAccountKeys, allLocalKeys);
  } catch (e) {
    console.log(e);
  }
});
