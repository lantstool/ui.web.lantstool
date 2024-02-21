import { effect } from '../../../../react-vault';

export const deleteKey = effect(async ({ slice, store, payload }: any) => {
  const { keyId, navigate } = payload;
  const [idb] = store.getEntities((store: any) => store.idb);
  const removeKey = slice.getActions((slice: any) => slice.removeKey);
  const networkId = store.getState((slice: any) => slice.networks.current.networkId);
  const spaceId = store.getState((slice: any) => slice.networks.current.spaceId);

  try {
    await idb.delete('keys', [spaceId,networkId,keyId]);

    removeKey(keyId);
    navigate(`/${networkId}/keys`);
  } catch (e) {
    console.log(e);
  }
});
