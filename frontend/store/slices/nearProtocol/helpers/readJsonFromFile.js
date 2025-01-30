import { strFromU8 } from 'fflate';

export const readJsonFromFile = async (file, setError) => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const json = strFromU8(arrayBuffer);
    return JSON.parse(json);
  } catch (e) {
    setError('file', { type: 'unzipJson', message: "Can't extract JSON from the file" });
  }
}
