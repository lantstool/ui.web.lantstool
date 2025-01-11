import { strFromU8, unzipSync } from 'fflate';

export const unzipJsonImportFile = async (file, setError) => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const files = unzipSync(new Uint8Array(arrayBuffer));
    // return data (second param) of the first file (there are always only 1 file)
    const json = strFromU8(Object.entries(files)[0][1]);
    return JSON.parse(json);
  } catch (e) {
    console.log(e);
    setError('file', { type: 'unzipJson', message: "Can't extract JSON from the file" });
  }
};
