export const renameFile = async (sourceName, targetName) => {
  try {
    // 1. Get a root handle
    const rootHandle = await navigator.storage.getDirectory();
    // 2. Get a file data
    const sourceHandle = await rootHandle.getFileHandle(sourceName);
    const sourceFile = await sourceHandle.getFile();
    const sourceArrayBuffer = await sourceFile.arrayBuffer();
    // 3. Create a new file
    const newFileHandle = await rootHandle.getFileHandle(targetName, { create: true });
    // 4. Write a source data to the new file
    const accessHandle = await newFileHandle.createSyncAccessHandle();
    accessHandle.write(sourceArrayBuffer);
    accessHandle.close();
    // 5. Remove the old file
    await rootHandle.removeEntry(sourceName);
  } catch (error) {
    console.error(error);
  }
};
