export const deleteDbFiles = async (name) => {
  try {
    const dir = await navigator.storage.getDirectory();
    // Looks like the wa-sqlite delete temporary folders '.ahp-' automatically
    // so we don't need to do it manually
    await Promise.all([
      dir.removeEntry(name),
      dir.removeEntry(`${name}-wal`),
      dir.removeEntry(`${name}-journal`),
    ]);
  } catch (e) {
    return new Error(`Error during a DB files deletion: ${e}`);
  }
};
