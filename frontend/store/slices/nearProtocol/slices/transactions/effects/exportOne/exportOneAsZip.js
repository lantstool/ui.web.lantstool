import { effect } from '@react-vault';
import { getFormattedJSON } from '../../../../../../helpers/utils.js';
import { downloadZip } from '../../../../../../helpers/downloadZip.js';
import { transformTxForExport } from './helpers/transformTxForExport.js';
import { createZipFromJsonString } from '../../../../helpers/createZipFromJsonString.js';

export const exportOneAsZip = effect(async ({ store, payload }) => {
  const { origin: transaction, form, closeModal } = payload;
  const setNotification = store.getActions((store) => store.setNotification);

  try {
    const json = await transformTxForExport(transaction, form.getValues(), store);
    const formatedJson = getFormattedJSON(json);

    const { name, zip } = await createZipFromJsonString(formatedJson, transaction.name);
    await downloadZip(zip, name);

    closeModal();
    setNotification({ isOpen: true, message: 'Downloaded zipped transaction', variant: 'success' });
  } catch (e) {
    console.log(e);
    setNotification({ isOpen: true, message: 'Transaction export error', variant: 'error' });
  }
});
