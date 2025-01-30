import { readJsonFromFile } from './readJsonFromFile.js';
import { unzipJsonImportFile } from './unzipJsonImportFile.js';

export const extractJsonFromImportFile = async (file, setError) => {
  if (file.type === 'application/zip') return await unzipJsonImportFile(file, setError);
  if (file.type === 'application/json') return await readJsonFromFile(file, setError);
};
