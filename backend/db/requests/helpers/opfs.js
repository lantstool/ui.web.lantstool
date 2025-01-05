import { asyncIteratorToArray } from './asyncIteratorToArray.js';

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
  await createFileFromU8Buffer({ buffer: new Uint8Array(arrayBuffer), name, path });
};

const getU8File = async ({ name, path }) => {
  const dirHandle = await getDirHandle({ path, create: false });
  const fileHandle = await dirHandle.getFileHandle(name);
  const file = await fileHandle.getFile();
  const arrayBuffer = await file.arrayBuffer();
  return new Uint8Array(arrayBuffer);
};

const deleteFile = async ({ path, name }) => {
  const dirHandle = await getDirHandle({ path, create: false });
  await dirHandle.removeEntry(name);
};

// Return all files of the particular directory; nested folders will be ignored;
// If no files - return empty array;
const getDirFiles = async ({ path }) => {
  try {
    const dirHandle = await getDirHandle({ path, create: false });
    const entriesArray = await asyncIteratorToArray(dirHandle.entries());
    const fileEntries = entriesArray.filter(([, entry]) => entry.kind === 'file');

    return Promise.all(
      fileEntries.map(async ([name, entry]) => {
        const file = await entry.getFile();
        return { name, file };
      }),
    );
  } catch (err) {
    if (err.name === 'NotFoundError') return [];
    throw err;
  }
};

const getDirU8Files = async ({ path }) => {
  const files = await getDirFiles({ path });

  return Promise.all(
    files.map(async ({ name, file }) => {
      const arrayBuffer = await file.arrayBuffer();
      return { name, file: new Uint8Array(arrayBuffer) };
    }),
  );
};

export const opfs = {
  isFileExist,
  getDirHandle,
  createFileFromU8Buffer,
  uploadFile,
  getU8File,
  deleteFile,
  getDirFiles,
  getDirU8Files,
};
