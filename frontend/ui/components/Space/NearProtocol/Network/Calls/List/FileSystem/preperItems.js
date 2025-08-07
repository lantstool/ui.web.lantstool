const transformCall = (list) =>
  list.map((call) => ({
    ...call,
    id: call.callId,
    itemType: 'call',
    canHaveChildren: false,
  }));

const transformFolders = (foldersList) =>
  foldersList.map((folder) => ({
    ...folder,
    id: folder?.folderId,
    itemType: 'folder',
    canHaveChildren: true,
    children: [],
  }));

//Prepare a sorted folder hierarchy and group calls accordingly
export const prepareItems = (list, foldersList) => {
  const folders = transformFolders(foldersList);
  const calls = transformCall(list);
  const sortedFolders = [...folders].sort((a, b) => a.name.localeCompare(b.name));
  const folderMap = Object.fromEntries(sortedFolders.map((folder) => [folder.folderId, folder]));
  const rootCall = [];

  calls.forEach((call) => {
    const parent = folderMap[call.parentId];
    parent ? parent.children.push(call) : rootCall.push(call);
  });

  return [...sortedFolders, ...rootCall];
};
