import { effect } from '@react-vault';
import { unzipJsonImportFile } from '../../../helpers/unzipJsonImportFile.js';
import { validateJson } from '../../../helpers/validateJson.js';

export const importOneFromZip = effect(async ({ slice, payload }) => {
  const { spaceId, networkId, formValues, navigate, closeModal, setError, yupSchema } = payload;
  const importOneFromJson = slice.getEffects((slice) => slice.importOneFromJson);

  const json = await unzipJsonImportFile(formValues.file, setError);
  if (!json) return;

  const isValid = await validateJson(json, setError, yupSchema);
  if (!isValid) return;

  await importOneFromJson({ spaceId, networkId, formValues: { json }, navigate, closeModal });
});
