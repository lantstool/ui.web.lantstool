import { effect } from '../../../../../../../react-vault/index.js';

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
  const createRpc = store.getEffects((store) => store.nearProtocol.createRpc);

  try {
    const rpc = await createRpc({ spaceId, networkId });
    const { keys: onChainAccountKeys } = await rpc.keys.getKeyList(accountId);

    const allLocalKeys = await backend.sendRequest('nearProtocol.keys.getIds', {
      spaceId,
      networkId,
    });

    return getKeys(onChainAccountKeys, allLocalKeys);
  } catch (e) {
    console.log(e);
  }
});