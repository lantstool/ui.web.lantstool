import { effect } from '@react-vault';

export const createOne = effect(async ({ store, slice, payload }) => {
  const [backend] = store.getEntities((store) => store.backend);
  const { spaceId, networkId, type } = payload;
  const pushOneToList = slice.getActions((slice) => slice.pushOneToList);

  try {
    const folder = await backend.sendRequest('nearProtocol.folders.createOne', {
      spaceId,
      networkId,
      type,
    });

    pushOneToList(folder);
  } catch (e) {
    console.log(e);
  }
});
