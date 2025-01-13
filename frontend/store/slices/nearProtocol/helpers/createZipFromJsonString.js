import { strToU8, zipSync } from 'fflate';
import { generateHashFromBytes, sanitizeFilename } from '../../../helpers/utils.js';

export const createZipFromJsonString = async (json, name) => {
  const jsonBytes = strToU8(json);
  const hash = await generateHashFromBytes(jsonBytes);
  const sanitizedName = await sanitizeFilename(name);
  const fileName = `${sanitizedName}#${hash}`;

  return {
    name: fileName,
    zip: zipSync({ [`${fileName}.json`]: jsonBytes }, { mtime: Date.now() }),
  };
};
