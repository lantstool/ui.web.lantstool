import { getBase58Hash } from '../../../helpers/getBase58Hash.js';

export const getHashedWasmName = async (fileName, fileArrayBuffer) => {
  // 1. Extract the name and extension from the original file name
  const fileNameParts = fileName.split('.');
  const extension = fileNameParts.pop();
  const baseName = fileNameParts.join('.');
  // 2. Calculate SHA-256 hash of the file
  const base58Hash = await getBase58Hash(fileArrayBuffer);
  // 3. Generate the new file name
  return `${baseName}-${base58Hash}.${extension}`;
};
