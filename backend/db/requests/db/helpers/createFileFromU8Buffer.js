// TODO replace with opfs utils
export const createFileFromU8Buffer = async (buffer, name) => {
  const rootHandle = await navigator.storage.getDirectory();
  const fileHandle = await rootHandle.getFileHandle(name, { create: true });
  const accessHandle = await fileHandle.createSyncAccessHandle();

  accessHandle.write(buffer.buffer);
  accessHandle.close();
};
