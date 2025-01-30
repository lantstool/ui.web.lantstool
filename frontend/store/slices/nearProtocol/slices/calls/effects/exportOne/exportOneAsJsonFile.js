import { effect } from '@react-vault';
import { downloadJson } from '../../../../../../helpers/downloadJson.js';
import {
  generateHashFromBytes,
  getFormattedJSON,
  sanitizeFilename,
} from '../../../../../../helpers/utils.js';
import { methods } from '../../helpers/methods/index.js';

export const exportOneAsJsonFile = effect(async ({ store, payload }) => {
  const { origin: call, form, closeModal } = payload;
  const setNotification = store.getActions((store) => store.setNotification);

  try {
    const method = form.getValues().method.value;
    const formatedJson = getFormattedJSON(methods[method].exportTransformer({ call, form }));

    // Create a unique hash based on the tx data;
    const buffer = Buffer.from(formatedJson);
    const hash = await generateHashFromBytes(new Uint8Array(buffer).buffer);

    const sanitizedName = await sanitizeFilename(call.name);
    const fileName = `${sanitizedName}#${hash}`;

    downloadJson(formatedJson, fileName);

    closeModal();
    setNotification({ isOpen: true, message: 'Call exported successfully', variant: 'success' });
  } catch (e) {
    console.log(e);
    setNotification({ isOpen: true, message: 'Call export error', variant: 'error' });
  }
});
