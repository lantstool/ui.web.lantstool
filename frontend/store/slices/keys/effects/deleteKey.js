import { effect } from '../../../../../react-vault/index.js';

export const deleteKey = effect(async ({ slice, store, payload }) => {
  const { keyId, navigate } = payload;
  const [idb] = store.getEntities((store) => store.idb);
  const removeKey = slice.getActions((slice) => slice.removeKey);
  const { spaceId, networkId } = store.getState((store) => store.networks.current);

  try {
    await idb.delete('keys', [spaceId, networkId, keyId]);

    removeKey(keyId);
    navigate(`/${networkId}/keys`);
  } catch (e) {
    console.log(e);
  }
});
