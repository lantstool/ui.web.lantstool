// Calculate order for items (tx or calls) inside a folder
export const getNewOrder = (folders, parentId) => {
  const folderIndex = folders.findIndex((folder) => folder.folderId === parentId);

  for (let i = folderIndex; i >= 0; i--) {
    const children = folders[i].children;
    if (children.length > 0) {
      const lastChild = children[children.length - 1];
      return lastChild.order + 1;
    }
  }

  return 0;
};