import { effect } from '@react-vault';

export const collapseOne = effect(async ({ store, slice, payload }) => {
  const [backend] = store.getEntities((store) => store.backend);
  const { spaceId, networkId, item, collapsed } = payload;
  const updateOne = slice.getActions((slice) => slice.updateOne);

  //We transform to an integer because DB does not support boolean type
  const isCollapsed = collapsed === true ? 1 : 0;

  try {
    await backend.sendRequest('nearProtocol.folders.collapseOne', {
      spaceId,
      networkId,
      folderId: item.folderId,
      collapsed: isCollapsed,
    });
    updateOne({ item });
  } catch (e) {
    console.log(e);
  }
});
