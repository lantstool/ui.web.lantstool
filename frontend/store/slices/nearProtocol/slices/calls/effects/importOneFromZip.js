import { effect } from '@react-vault';
import { unzipSync, strFromU8 } from 'fflate';
import { callImportSchema } from '../../../../../../ui/components/Space/NearProtocol/Network/Calls/List/ImportModal/_general/validations/callImportSchema.js';

const unzipJson = async (file, setError) => {
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

const validateJson = async (json, setError) => {
  try {
    await callImportSchema.validate({ json });
    return true;
  } catch (e) {
    setError('file', { type: 'invalidJson', message: e.message });
    return false;
  }
};

export const importOneFromZip = effect(async ({ slice, payload }) => {
  const { spaceId, networkId, formValues, navigate, closeModal, setError } = payload;
  const importOneFromJson = slice.getEffects((slice) => slice.importOneFromJson);

  const json = await unzipJson(formValues.file, setError);
  if (!json) return;

  const isValid = await validateJson(json, setError);
  if (!isValid) return;

  await importOneFromJson({ spaceId, networkId, formValues: { json }, navigate, closeModal });
});
