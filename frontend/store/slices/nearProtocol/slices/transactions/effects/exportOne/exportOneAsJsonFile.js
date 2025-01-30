import { effect } from '@react-vault';
import {
  generateHashFromBytes,
  getFormattedJSON,
  sanitizeFilename,
} from '../../../../../../helpers/utils.js';
import { downloadJson } from '../../../../../../helpers/downloadJson.js';
import { transformTxForExport } from './helpers/transformTxForExport.js';

export const exportOneAsJsonFile = effect(async ({ store, payload }) => {
  const { origin: transaction, form, closeModal } = payload;
  const setNotification = store.getActions((store) => store.setNotification);

  try {
    const json = await transformTxForExport(transaction, form.getValues(), store);
    const formatedJson = getFormattedJSON(json);
    // Create a unique hash based on the tx data;
    const buffer = Buffer.from(formatedJson);
    const hash = await generateHashFromBytes(new Uint8Array(buffer).buffer);

    const sanitizedName = await sanitizeFilename(transaction.name);
    const fileName = `${sanitizedName}#${hash}`;

    downloadJson(formatedJson, fileName);

    closeModal();
    setNotification({
      isOpen: true,
      message: 'Transaction exported successfully',
      variant: 'success',
    });
  } catch (e) {
    console.log(e);
    setNotification({ isOpen: true, message: 'Transaction export error', variant: 'error' });
  }
});
