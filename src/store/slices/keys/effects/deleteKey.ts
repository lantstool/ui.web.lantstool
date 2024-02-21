import { effect } from '../../../../react-vault';

export const deleteKey = effect(async ({ slice, store, payload }: any) => {
  const { keyId, navigate } = payload;
  const [idb] = store.getEntities((store: any) => store.idb);
  const removeKey = slice.getActions((slice: any) => slice.removeKey);
  const { spaceId, networkId } = store.getState((store: any) => store.networks.current);

  try {
    await idb.delete('keys', [spaceId, networkId, keyId]);

    removeKey(keyId);
    navigate(`/${networkId}/keys`);
  } catch (e) {
    console.log(e);
  }
});
