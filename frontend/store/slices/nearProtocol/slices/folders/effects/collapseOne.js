import { effect } from '@react-vault';

export const collapseOne = effect(async ({ store, slice, payload }) => {
  const [backend] = store.getEntities((store) => store.backend);
  const { spaceId, networkId, item, wrapperProps } = payload;
  const { collapsed, onCollapse } = wrapperProps;
  const collapse = slice.getActions((slice) => slice.collapse);

  try {
    //We transform to an integer because DB does not support boolean type
    const isCollapsed = collapsed ? 0 : 1;

    await backend.sendRequest('nearProtocol.folders.collapseOne', {
      spaceId,
      networkId,
      folderId: item.folderId,
      collapsed: isCollapsed,
    });

    onCollapse();
    collapse({ item });
  } catch (e) {
    console.log(e);
  }
});
