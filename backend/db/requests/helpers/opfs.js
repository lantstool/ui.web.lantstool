export const getDirHandle = async ({ path, create = true }) => {
  const rootHandle = await navigator.storage.getDirectory();
  if (!path) return rootHandle;

  const folders = path.split('/');
  // Iterate through folder structure
  return folders.reduce(async (currentHandlePromise, folder) => {
    const currentHandle = await currentHandlePromise;
    return currentHandle.getDirectoryHandle(folder, { create });
  }, Promise.resolve(rootHandle)); // Start with the base handle as the initial value
};

export const isFileExist = async ({ path, name }) => {
  try {
    const dirHandle = await getDirHandle({ path, create: false });
    // Attempt to get the file handle without creating it
    await dirHandle.getFileHandle(name, { create: false });
    return true; // File exists
  } catch (err) {
    if (err.name === 'NotFoundError') {
      return false; // File does not exist
    }
    throw err; // Rethrow other errors
  }
};

export const createFileFromU8Buffer = async ({ buffer, name, path }) => {
  const dirHandle = await getDirHandle({ path, create: true });
  const fileHandle = await dirHandle.getFileHandle(name, { create: true });
  const accessHandle = await fileHandle.createSyncAccessHandle();

  accessHandle.write(buffer.buffer);
  accessHandle.close();
};

export const uploadFile = async ({ file, name, path }) => {
  const arrayBuffer = await file.arrayBuffer();
  await opfs.createFileFromU8Buffer({ buffer: new Uint8Array(arrayBuffer), name, path });
};

export const opfs = {
  isFileExist,
  getDirHandle,
  createFileFromU8Buffer,
  uploadFile,
};
