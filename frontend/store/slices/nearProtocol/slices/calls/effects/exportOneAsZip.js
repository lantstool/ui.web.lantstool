import { effect } from '@react-vault';
import { zipSync, strToU8 } from 'fflate';
import { getFormattedJSON } from '../../../../../helpers/utils.js';
import { methods } from '../helpers/methods/index.js';
import { sanitizeFilename, generateHashFromBytes } from '../../../../../helpers/utils.js';
import { downloadZip } from '../../../../../helpers/downloadZip.js';

const createZipFromJsonString = async (json, callName) => {
  const jsonBytes = strToU8(json);
  const hash = await generateHashFromBytes(jsonBytes);
  const sanitizedName = await sanitizeFilename(callName);
  const fileName = `${sanitizedName}#${hash}`;

  return {
    name: fileName,
    zip: zipSync({ [`${fileName}.json`]: jsonBytes }, { mtime: Date.now() }),
  };
};

export const exportOneAsZip = effect(async ({ store, payload }) => {
  const { call, form, closeModal } = payload;
  const setNotification = store.getActions((store) => store.setNotification);

  try {
    const method = form.getValues().method.value;
    const json = getFormattedJSON(methods[method].exportTransformer({ call, form }));

    const { name, zip } = await createZipFromJsonString(json, call.name);
    await downloadZip(zip, name);

    closeModal();
    setNotification({ isOpen: true, message: 'Downloaded zipped call', variant: 'success' });
  } catch (e) {
    console.log(e);
    setNotification({ isOpen: true, message: 'Call export error', variant: 'error' });
  }
});
