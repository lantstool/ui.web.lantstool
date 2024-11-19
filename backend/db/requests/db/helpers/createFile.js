export const createFile = async (file) => {
  const rootHandle = await navigator.storage.getDirectory();
  const fileHandle = await rootHandle.getFileHandle(file.name, { create: true });

  const accessHandle = await fileHandle.createSyncAccessHandle();
  const arrayBuffer = await file.arrayBuffer();

  accessHandle.write(arrayBuffer);
  accessHandle.close();
};
