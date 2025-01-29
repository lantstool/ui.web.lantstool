import { effect } from '@react-vault';
import { readJsonFromFile } from '../../../../helpers/readJsonFromFile.js';
import { unzipJsonImportFile } from '../../../../helpers/unzipJsonImportFile.js';
import { validateJson } from '../../../../helpers/validateJson.js';

const extractJsonFromFile = async (file, setError) => {
  if (file.type === 'application/zip') return await unzipJsonImportFile(file, setError);
  if (file.type === 'application/json') return await readJsonFromFile(file, setError);
};

export const importOneFromFile = effect(async ({ slice, payload }) => {
  const {
    spaceId,
    networkId,
    formValues,
    navigate,
    closeModal,
    setError,
    yupSchema,
    transactionConfig,
  } = payload;

  const importOneFromJson = slice.getEffects((slice) => slice.importOneFromJson);

  const json = await extractJsonFromFile(formValues.file, setError);
  if (!json) return;

  const isValid = await validateJson(json, setError, yupSchema);
  if (!isValid) return;

  await importOneFromJson({
    spaceId,
    networkId,
    formValues: { json },
    navigate,
    closeModal,
    transactionConfig,
  });
});
