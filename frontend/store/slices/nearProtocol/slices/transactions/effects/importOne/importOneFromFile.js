import { effect } from '@react-vault';
import { extractJsonFromImportFile } from '../../../../helpers/extractJsonFromImportFile.js';
import { validateJson } from '../../../../helpers/validateJson.js';

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

  const json = await extractJsonFromImportFile(formValues.file, setError);
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
